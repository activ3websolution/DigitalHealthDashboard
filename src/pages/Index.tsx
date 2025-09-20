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
  ExternalLink
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

      {/* Features Section */}
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
                  onClick={() => window.open('https://activ3websolutions.com/contact', '_blank')}
                >
                  Get Professional Help <ExternalLink className="ml-2 h-4 w-4" />
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
            <div className="flex items-center space-x-2">
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
