import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PageSpeedResponse {
  lighthouseResult: {
    audits: {
      [key: string]: {
        score: number | null;
        displayValue?: string;
        description: string;
        title: string;
      };
    };
    categories: {
      performance: { score: number };
      accessibility: { score: number };
      'best-practices': { score: number };
      seo: { score: number };
    };
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { url } = await req.json()
    
    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get the API key from Supabase secrets
    const apiKey = Deno.env.get('GOOGLE_PAGESPEED_API_KEY')
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Google PageSpeed API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Clean the URL
    const cleanUrl = url.startsWith('http') ? url : `https://${url}`
    
    // Call Google PageSpeed Insights API for mobile
    const mobileResponse = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(cleanUrl)}&key=${apiKey}&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo`
    )
    
    const desktopResponse = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(cleanUrl)}&key=${apiKey}&strategy=desktop&category=performance&category=accessibility&category=best-practices&category=seo`
    )

    if (!mobileResponse.ok || !desktopResponse.ok) {
      const errorText = await mobileResponse.text()
      console.error('PageSpeed API Error:', errorText)
      return new Response(
        JSON.stringify({ error: 'Failed to analyze website' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const mobileData: PageSpeedResponse = await mobileResponse.json()
    const desktopData: PageSpeedResponse = await desktopResponse.json()

    // Extract scores (multiply by 100 to get percentage)
    const performanceMobile = Math.round((mobileData.lighthouseResult.categories.performance.score || 0) * 100)
    const performanceDesktop = Math.round((desktopData.lighthouseResult.categories.performance.score || 0) * 100)
    const accessibility = Math.round((mobileData.lighthouseResult.categories.accessibility.score || 0) * 100)
    const seo = Math.round((mobileData.lighthouseResult.categories.seo.score || 0) * 100)
    const bestPractices = Math.round((mobileData.lighthouseResult.categories['best-practices'].score || 0) * 100)

    // Calculate overall score
    const overallScore = Math.round((performanceMobile + performanceDesktop + accessibility + seo + bestPractices) / 5)

    // Extract specific issues from audits
    const issues = []
    const audits = mobileData.lighthouseResult.audits

    // Performance issues
    if (audits['largest-contentful-paint']?.score !== null && (audits['largest-contentful-paint']?.score || 0) < 0.5) {
      issues.push({
        title: 'Slow Largest Contentful Paint',
        description: `Your largest contentful paint is ${audits['largest-contentful-paint']?.displayValue || 'slow'}. This affects user experience.`,
        severity: 'high' as const,
        category: 'performance' as const,
        impact: 'Poor Core Web Vitals, lower search rankings'
      })
    }

    if (audits['unused-css-rules']?.score !== null && (audits['unused-css-rules']?.score || 0) < 0.5) {
      issues.push({
        title: 'Unused CSS',
        description: audits['unused-css-rules']?.description || 'Remove unused CSS to improve performance.',
        severity: 'medium' as const,
        category: 'performance' as const,
        impact: 'Slower page loading, wasted bandwidth'
      })
    }

    if (audits['render-blocking-resources']?.score !== null && (audits['render-blocking-resources']?.score || 0) < 0.5) {
      issues.push({
        title: 'Render-blocking Resources',
        description: audits['render-blocking-resources']?.description || 'Eliminate render-blocking resources.',
        severity: 'high' as const,
        category: 'performance' as const,
        impact: 'Delayed page rendering, poor user experience'
      })
    }

    // SEO issues
    if (audits['meta-description']?.score !== null && (audits['meta-description']?.score || 0) < 1) {
      issues.push({
        title: 'Missing Meta Descriptions',
        description: audits['meta-description']?.description || 'Meta descriptions are missing on some pages.',
        severity: 'medium' as const,
        category: 'seo' as const,
        impact: 'Lower click-through rates from search results'
      })
    }

    // Accessibility issues
    if (audits['image-alt']?.score !== null && (audits['image-alt']?.score || 0) < 1) {
      issues.push({
        title: 'Missing Image Alt Text',
        description: audits['image-alt']?.description || 'Images are missing alt text.',
        severity: 'medium' as const,
        category: 'accessibility' as const,
        impact: 'Poor accessibility, SEO penalties'
      })
    }

    if (audits['color-contrast']?.score !== null && (audits['color-contrast']?.score || 0) < 1) {
      issues.push({
        title: 'Poor Color Contrast',
        description: audits['color-contrast']?.description || 'Background and foreground colors do not have sufficient contrast.',
        severity: 'medium' as const,
        category: 'accessibility' as const,
        impact: 'Poor readability, accessibility issues'
      })
    }

    // Security/Best Practices
    if (audits['is-on-https']?.score !== null && (audits['is-on-https']?.score || 0) < 1) {
      issues.push({
        title: 'Not Using HTTPS',
        description: audits['is-on-https']?.description || 'Does not use HTTPS.',
        severity: 'high' as const,
        category: 'security' as const,
        impact: 'Security warnings, lower search rankings'
      })
    }

    if (audits['uses-optimized-images']?.score !== null && (audits['uses-optimized-images']?.score || 0) < 0.5) {
      issues.push({
        title: 'Unoptimized Images',
        description: audits['uses-optimized-images']?.description || 'Serve images in next-gen formats.',
        severity: 'medium' as const,
        category: 'performance' as const,
        impact: 'Slower loading times, poor mobile experience'
      })
    }

    // Prepare response
    const analysisResult = {
      overallScore,
      performanceMobile,
      performanceDesktop,
      accessibility,
      seo,
      bestPractices,
      siteUrl: new URL(cleanUrl).hostname,
      issues: issues.slice(0, 8), // Limit to 8 issues
      analyzedAt: new Date().toISOString()
    }

    return new Response(
      JSON.stringify(analysisResult),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})