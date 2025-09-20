import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import { 
  Shield, 
  BarChart3, 
  Zap, 
  Users, 
  CheckCircle, 
  Star,
  ArrowRight,
  ExternalLink,
  Globe
} from "lucide-react";
import heroImage from "@/assets/dashboard-hero.jpg";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 rounded-full text-sm font-medium text-brand-primary">
                  <Shield className="h-4 w-4" />
                  Free Website Health Check
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Is Your Website
                  <span className="bg-gradient-brand bg-clip-text text-transparent"> Healthy</span>?
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Get a comprehensive analysis of your website's performance, SEO, and user experience in seconds. 
                  Discover what's holding your site back from reaching its full potential.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="brand" 
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="text-lg px-8 py-6 h-auto"
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Get Free Health Check
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open('https://activ3websolutions.com', '_blank')}
                  className="text-lg px-8 py-6 h-auto"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-health-excellent" />
                  <span>100% Free Forever</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-health-excellent" />
                  <span>No Credit Card Required</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-brand rounded-2xl blur-3xl opacity-20"></div>
              <img 
                src={heroImage} 
                alt="Digital health dashboard showing website performance metrics"
                className="relative rounded-2xl shadow-elevated w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get comprehensive insights about your website's health in just three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Enter Your Website",
                description: "Simply paste your website URL into our analysis tool. No registration or setup required.",
                icon: <Globe className="h-8 w-8 text-brand-primary" />
              },
              {
                step: "02", 
                title: "Instant Analysis",
                description: "Our tool automatically scans your site for performance, SEO, accessibility, and security issues.",
                icon: <BarChart3 className="h-8 w-8 text-brand-primary" />
              },
              {
                step: "03",
                title: "Get Solutions",
                description: "Receive a detailed report with actionable recommendations and connect with our expert team for fixes.",
                icon: <CheckCircle className="h-8 w-8 text-brand-primary" />
              }
            ].map((step, index) => (
              <Card key={index} className="relative border-border shadow-soft hover:shadow-brand transition-all duration-300 group text-center">
                <CardContent className="p-8 space-y-4">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-gradient-brand text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="pt-4">
                    <div className="flex justify-center group-hover:scale-110 transition-transform duration-200 mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground">
                Start with a free website health check, or contact our team directly for professional web solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Free Health Check Card */}
              <Card className="bg-gradient-brand border-0 shadow-brand text-white text-center">
                <CardContent className="p-8 space-y-4">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Free Health Check</h3>
                  <p className="opacity-90 mb-6">
                    Get an instant analysis of your website's performance, SEO, and user experience issues.
                  </p>
                  <Button 
                    variant="secondary" 
                    size="lg"
                    onClick={() => navigate('/dashboard')}
                    className="w-full"
                  >
                    Start Free Analysis
                  </Button>
                </CardContent>
              </Card>

              {/* Professional Help Card */}
              <Card className="border-border shadow-soft text-center">
                <CardContent className="p-8 space-y-4">
                  <Users className="h-12 w-12 text-brand-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-4">Professional Help</h3>
                  <p className="text-muted-foreground mb-6">
                    Need expert assistance? Our team at Activ3 Web Solutions specializes in fixing website issues and boosting performance.
                  </p>
                  <Button 
                    variant="cta" 
                    size="lg"
                    onClick={() => window.open('https://activ3websolutions.com/contact', '_blank')}
                    className="w-full"
                  >
                    Contact Our Experts <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              What We Analyze
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive health check covers all the critical aspects that impact your website's success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-brand-primary" />,
                title: "Performance Speed",
                description: "Check load times, optimize images, and identify speed bottlenecks that hurt user experience."
              },
              {
                icon: <Shield className="h-8 w-8 text-brand-primary" />,
                title: "Security Issues",
                description: "Detect security vulnerabilities, SSL certificate status, and potential threats."
              },
              {
                icon: <Users className="h-8 w-8 text-brand-primary" />,
                title: "User Experience",
                description: "Analyze accessibility, mobile responsiveness, and overall usability factors."
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-brand-primary" />,
                title: "SEO Optimization", 
                description: "Review meta tags, structured data, and search engine optimization opportunities."
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-brand-primary" />,
                title: "Code Quality",
                description: "Examine HTML validity, CSS optimization, and JavaScript performance issues."
              },
              {
                icon: <Star className="h-8 w-8 text-brand-primary" />,
                title: "Best Practices",
                description: "Ensure your site follows modern web standards and industry best practices."
              }
            ].map((feature, index) => (
              <Card key={index} className="border-border shadow-soft hover:shadow-brand transition-all duration-300 group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center group-hover:scale-110 transition-transform duration-200">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-brand border-0 shadow-elevated text-white text-center">
            <CardContent className="p-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to Boost Your Website's Performance?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                Join thousands of businesses who've improved their website's health with our free analysis tool. 
                Get actionable insights and connect with our expert team for professional solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="text-lg px-8 py-6 h-auto"
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Start Free Analysis
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
                  onClick={() => window.open('https://activ3websolutions.com', '_blank')}
                >
                  Learn About Activ3 <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-brand rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">HealthCheck</span>
                <span className="text-xs text-muted-foreground">by Activ3 Web Solutions</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2024 Activ3 Web Solutions. All rights reserved.
            </p>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.open('https://activ3websolutions.com', '_blank')}
            >
              Visit Activ3 Web Solutions <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
