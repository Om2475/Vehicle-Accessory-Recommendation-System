import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Navbar from '../components/navbar';
import { BarChart3, TrendingUp, Package, Star, DollarSign, Heart, Activity } from 'lucide-react';

interface AnalyticsProps {
  user: any;
}

export default function AnalyticsPage({ user }: AnalyticsProps) {
  const analytics = [
    {
      title: 'Price Distribution',
      description: 'Distribution of accessory prices across all products',
      image: '/images/analytics/price_distribution.png',
      icon: DollarSign,
    },
    {
      title: 'Sentiment Analysis',
      description: 'Customer sentiment breakdown from product reviews',
      image: '/images/analytics/sentiment_breakdown.png',
      icon: Heart,
    },
    {
      title: 'Category Distribution',
      description: 'Top 10 most popular accessory categories',
      image: '/images/analytics/category_distribution.png',
      icon: Package,
    },
    {
      title: 'Brand Distribution',
      description: 'Top 10 car brands by accessory count',
      image: '/images/analytics/brand_distribution.png',
      icon: BarChart3,
    },
    {
      title: 'Quality Scores',
      description: 'Overall product quality score distribution',
      image: '/images/analytics/quality_distribution.png',
      icon: Star,
    },
    {
      title: 'Sentiment vs Price',
      description: 'Correlation between product price and customer sentiment',
      image: '/images/analytics/sentiment_price_correlation.png',
      icon: TrendingUp,
    },
    {
      title: 'System Overview',
      description: 'Key statistics and metrics summary',
      image: '/images/analytics/summary_stats.png',
      icon: Activity,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <BarChart3 className="h-12 w-12 text-primary" />
            Analytics Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive insights into our car accessories catalog, customer sentiment, and product distribution
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">1,269</div>
              <p className="text-xs text-muted-foreground mt-1">
                Accessories available
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Positive Reviews</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">85%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Customer satisfaction
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Supported Brands</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">50+</div>
              <p className="text-xs text-muted-foreground mt-1">
                Car manufacturers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {analytics.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <item.icon className="h-6 w-6 text-primary" />
                  {item.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative w-full bg-[#1e293b] p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Analytics are generated from {new Date().toLocaleDateString()} dataset
          </p>
        </div>
      </div>
    </div>
  );
}
