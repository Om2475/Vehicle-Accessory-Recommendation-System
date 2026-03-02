import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import {
  Heart,
  ShoppingCart,
  Trash2,
  ChevronLeft,
  Package,
  Star,
  Sparkles,
} from 'lucide-react';
import Navbar from '../components/navbar';

interface WishlistPageProps {
  user: any;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ user }) => {
  const navigate = useNavigate();
  const { wishlistItems = [], removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemoveItem = (accessoryId: string, name: string) => {
    removeFromWishlist(accessoryId);
    toast.success(`${name} removed from wishlist`);
  };

  const handleClearWishlist = () => {
    if (wishlistItems.length === 0) {
      toast.error('Your wishlist is already empty!');
      return;
    }
    clearWishlist();
    toast.success('Wishlist cleared successfully!');
  };

  const handleAddToCart = (item: any) => {
    addToCart(item);
    toast.success(`${item.accessory_name} added to cart!`);
  };

  const handleMoveToCart = (item: any) => {
    addToCart(item);
    removeFromWishlist(item.accessory_id);
    toast.success(`${item.accessory_name} moved to cart!`);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'bg-green-500';
      case 'neutral':
        return 'bg-yellow-500';
      case 'negative':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold flex items-center gap-3">
                <Heart className="h-8 w-8 text-primary" />
                My Wishlist
              </h1>
              <p className="text-muted-foreground mt-2">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            {wishlistItems.length > 0 && (
              <Button variant="destructive" onClick={handleClearWishlist}>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Wishlist
              </Button>
            )}
          </div>
        </div>

        {/* Empty Wishlist */}
        {wishlistItems.length === 0 ? (
          <Card className="p-12 text-center border-2 border-dashed">
            <Heart className="h-24 w-24 mx-auto text-primary/50 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Save your favorite accessories for later!
            </p>
            <Button 
              onClick={() => navigate('/finder')}
            >
              Find Accessories
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.accessory_id} className="group hover:shadow-2xl transition-all duration-300 hover:border-primary overflow-hidden">
                <div className="relative">
                  {/* Product Image */}
                  <div className="w-full h-48 bg-primary/10 flex items-center justify-center relative overflow-hidden">
                    <Package className="h-20 w-20 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute top-3 right-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/80 hover:bg-white shadow-lg"
                        onClick={() => handleRemoveItem(item.accessory_id, item.accessory_name)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-4">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      {item.final_score && (
                        <Badge className="bg-primary text-primary-foreground">
                          <Star className="h-3 w-3 mr-1" />
                          {item.final_score.toFixed(1)}% Match
                        </Badge>
                      )}
                      {item.sentiment_label && (
                        <Badge className={getSentimentColor(item.sentiment_label)}>
                          {item.sentiment_label}
                        </Badge>
                      )}
                      {item.quality_score && item.quality_score >= 0.7 && (
                        <Badge className="bg-green-500 text-white">
                          <Sparkles className="h-3 w-3 mr-1" />
                          High Quality
                        </Badge>
                      )}
                    </div>

                    {/* Product Info */}
                    <div>
                      <h3 className="text-xl font-bold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                        {item.accessory_name}
                      </h3>
                      {(item.car_brand || item.car_model) && (
                        <p className="text-sm text-muted-foreground">
                          {item.car_brand} {item.car_model && `- ${item.car_model}`}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    {item.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    {/* Price */}
                    <div className="text-2xl font-bold text-primary">
                      ₹{item.price.toLocaleString()}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-2">
                      <Button
                        onClick={() => navigate('/buy', { state: { accessory: item } })}
                        className="w-full"
                      >
                        Buy Now
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleMoveToCart(item)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Move to Cart
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
