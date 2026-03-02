import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AccessoryRecommendation } from '../lib/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';
import Navbar from '../components/navbar';
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  RefreshCcw,
  ChevronLeft,
  Plus,
  Minus,
  Check,
  Package,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

const BuyPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const accessory = location.state?.accessory as AccessoryRecommendation;

  const [quantity, setQuantity] = useState(1);
  const isWishlisted = accessory ? isInWishlist(accessory.accessory_id) : false;

  if (!accessory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(accessory);
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(accessory.accessory_id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(accessory);
      toast.success('Added to wishlist!');
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Calculate quality percentage
  const qualityPercentage = Math.round(accessory.quality_score * 100);

  // Determine sentiment color
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

  // Image mapping by category (same as Results page)
  const imageByCategory: Record<string, string> = {
    'floor-mat': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/f96d91d1fadf5d7f475ff489a7432212c7961bfa.jpg',
    'trunk-mat': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/732f39fe4d23f698e0df4674380ac609598c0c0c.jpg',
    'seat-cover': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/3e84e76b822ec077c5eefaac64971ac70ef88508.jpg',
    'steering-cover': 'https://pplx-res.cloudinary.com/image/upload/v1764226482/search_images/f6a26a5a45132341d8efa0c6d6cc9a59e11c5027.jpg',
    'car-cover': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/5c1cc23729d5c2f59b3f41c8b4a4c31d1aecc7d4.jpg',
    'sunshade': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/e542ceecc9c70dc17eba8af8031e78d6b7295fad.jpg',
    'screen-protector': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/c897f16dbedd5b0b370441876bff359595b10772.jpg',
    'phone-holder': 'https://pplx-res.cloudinary.com/image/upload/v1764519756/search_images/4b4ce85f598dc86ea9025335f1399f3d0f99cc04.jpg',
    'charger': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/1c3323e1d2f8e34eba9451c2cb352a291d3ecd26.jpg',
    'key-cover': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/5d2f19200a8e7138d22e871bb6c9cf05a160c7a4.jpg',
    'light': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/9b6197ab78e9295632c29e27a3ef760d415ee68c.jpg',
    'camera': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/1c080502ff05be4c2127c3c2daaccf6d1960fe62.jpg',
    'air-freshener': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/ffb903d528acf4e307dd6c13128f3a91a74c4bc3.jpg',
    'vacuum': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/45a98318138ecac34280899cd88466d83e58ce21.jpg',
    'organizer': 'https://pplx-res.cloudinary.com/image/upload/v1763973738/search_images/dd6224352e76b0859404050f2be77fdc054db2ca.jpg',
    'wiper': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/f2e7ef1b68229e8da92373c0bbc2aab2f484ed77.jpg',
    'door-sill': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/09324892c5a079ed4754e02f2f70eed9eecadaf5.jpg',
    'mud-flap': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/a16dbb8963ff1d4b4a5b340e61ad086170dcc5e3.jpg',
    'bumper-guard': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/1035d8e525fc3d26881d38d8240c166214058909.jpg',
    'door-visor': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/ae3b1eecd6051baa4d64c0a3e31c1219ac5212ad.jpg',
    'antenna': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/d20df3d0f01da9288c8fe10f90c58f610edd5f67.jpg',
    'roof-rail': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/af7522baca74cc4616d63dc91e3c5fc16d35eec0.jpg',
    'dashboard': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/c897f16dbedd5b0b370441876bff359595b10772.jpg',
    'sticker': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/09324892c5a079ed4754e02f2f70eed9eecadaf5.jpg',
    'armrest': 'https://pplx-res.cloudinary.com/image/upload/v1763973738/search_images/dd6224352e76b0859404050f2be77fdc054db2ca.jpg',
    'sticker-film': 'https://pplx-res.cloudinary.com/image/upload/v1764694320/search_images/675f24bbb988d3cffb10ff9aafd067a33da586c3.jpg',
    'door-edge-guard': 'https://pplx-res.cloudinary.com/image/upload/v1764694320/search_images/b14d280d77211a09cd164ac2fe7f646676ef4372.jpg',
    'side-beading': 'https://pplx-res.cloudinary.com/image/upload/v1764694320/search_images/55d7f2c3e3f5870083bdc71a09e9b7629c5adc28.jpg',
    'chrome-garnish': 'https://pplx-res.cloudinary.com/image/upload/v1764694321/search_images/00a4bc990b8cda039b13d4f1c171291e35be3913.jpg',
    'mirror-cover': 'https://pplx-res.cloudinary.com/image/upload/v1764694320/search_images/946019e1e94e829c0c6cbdce0827c4eb7eeb39b2.jpg',
    'blind-spot-mirror': 'https://pplx-res.cloudinary.com/image/upload/v1764694320/search_images/d5d9de280e43a7c16cbdb531ab39227c2517c109.jpg',
    'handbrake-grip': 'https://pplx-res.cloudinary.com/image/upload/v1764694320/search_images/3db3be86154a78a103eb1d32fdb56163513891a3.jpg',
    'door-shock-absorber': 'https://pplx-res.cloudinary.com/image/upload/v1764694320/search_images/aead9ca3bfd29cb8a09f60e045aa88ca89c492b5.jpg',
    'tissue-holder': 'https://pplx-res.cloudinary.com/image/upload/v1764694320/search_images/c7bc2e9126fc0a4838d7b1c34965e6390e0c3fed.jpg',
    'toolkit': 'https://pplx-res.cloudinary.com/image/upload/v1764694320/search_images/b056bcd433fadd83427fbe637cf4736a41f1d567.jpg',
    'tpms': 'https://pplx-res.cloudinary.com/image/upload/v1764694320/search_images/40f1d17c25ee41650a2e959f62e77034baef2039.jpg',
    'inflator-compressor': 'https://pplx-res.cloudinary.com/image/upload/v1764691404/search_images/24ed033e6b2898ab63ab558cdffdc45cec7d6b54.jpg',
    'tow-hook-rope': 'https://pplx-res.cloudinary.com/image/upload/v1764694320/search_images/bae642a0932c8e8abf2e59c26da4cd0c41713d4a.jpg',
    'number-plate-frame': 'https://pplx-res.cloudinary.com/image/upload/v1764694320/search_images/a1b78946aa5925d3cddb232ab752ad1641ccc2be.jpg',
    'trash-bin': 'https://pplx-res.cloudinary.com/image/upload/v1764694320/search_images/cbcf2e8ffc896acfb1d710614629c83c5f5afd45.jpg',
    'seat-belt-accessories': 'https://pplx-res.cloudinary.com/image/upload/v1764694320/search_images/24e9d0af0c0f0edb0a469db1c8189a6bbc68ed9c.jpg',
  };

  const getCategoryForAccessory = (accessoryName: string, description: string): string | null => {
    const name = (accessoryName || '').toLowerCase();
    const desc = (description || '').toLowerCase();
    const text = `${name} ${desc}`;

    if (/(door\s*visor|rain\s*guard|wind\s*deflector)/.test(text)) return 'door-visor';
    if (/(bumper).*guard/.test(text)) return 'bumper-guard';
    if (/(door\s*sill|scuff\s*plate|sill\s*plate)/.test(text)) return 'door-sill';
    if (/(trunk|boot|dicky).*mat/.test(text)) return 'trunk-mat';
    if (/(floor|foot|car)\s*mat/.test(text) || /\b[3791]d\b.*mat/.test(text)) return 'floor-mat';
    if (/seat\s*(cover|cushion)/.test(text)) return 'seat-cover';
    if (/steering.*(cover|grip)/.test(text)) return 'steering-cover';
    if (/(car|body)\s*cover/.test(text) && !/seat/.test(text)) return 'car-cover';
    if (/(screen\s*(guard|protector)|infotainment|cluster)/.test(text)) return 'screen-protector';
    if (/(sun\s*shade|curtain|sunshade)/.test(text)) return 'sunshade';
    if (/(phone|mobile).*\b(holder|mount)\b/.test(text)) return 'phone-holder';
    if (/(car)?.*(charger|charging|usb|type-c|qc\s*3\.0)/.test(text)) return 'charger';
    if (/(key)\s*(cover|fob|shell|case)/.test(text)) return 'key-cover';
    if (/(head.?light|fog\s*light|led\s*light|tail\s*light|lamp|ambient\s*light)/.test(text)) return 'light';
    if (/(reverse|parking).*camera|dash\s*cam/.test(text)) return 'camera';
    if (/(air\s*freshener|perfume|fragrance)/.test(text)) return 'air-freshener';
    if (/(vacuum|car\s*cleaner)/.test(text)) return 'vacuum';
    if (/(organizer|storage|tray|pocket|console)/.test(text)) return 'organizer';
    if (/(wiper|washer)/.test(text)) return 'wiper';
    if (/(antenna|shark\s*fin)/.test(text)) return 'antenna';
    if (/(roof\s*(rail|rack|carrier))/.test(text)) return 'roof-rail';
    if (/(dashboard|dash\s*cover|dash\s*mat)/.test(text)) return 'dashboard';
    if (/(sticker|decal|graphics|film|reflective|door\s*handle\s*protector|anti\s*fog|anti\s*rain|door\s*sill\s*(sticker|protector|edge))/.test(text)) return 'sticker-film';
    if (/(armrest|arm\s*rest|center\s*console\s*armrest|armrest\s*cushion)/.test(text)) return 'armrest';
    if (/door\s*edge\s*(guard|protector)|edge\s*guard/.test(text)) return 'door-edge-guard';
    if (/side\s*(beading|cladding)|body\s*cladding|door\s*side\s*moulding/.test(text)) return 'side-beading';
    if (/chrome\s*(garnish|lining|beading)|dicky\s*patti|boot\s*garnish/.test(text)) return 'chrome-garnish';
    if (/mirror\s*cover|mirror\s*caps|carbon\s*fiber\s*mirror/.test(text)) return 'mirror-cover';
    if (/blind\s*spot\s*mirror|convex\s*mirror/.test(text)) return 'blind-spot-mirror';
    if (/handbrake|hand\s*brake\s*(grip|cover)/.test(text)) return 'handbrake-grip';
    if (/door\s*shock\s*(absorber|pad|gasket)|anti\s*collision\s*pad/.test(text)) return 'door-shock-absorber';
    if (/tissue\s*holder|sun\s*visor\s*tissue|napkin\s*holder/.test(text)) return 'tissue-holder';
    if (/(tool\s*kit|toolkit|tools\s*set)/.test(text)) return 'toolkit';
    if (/(tpms|tyre\s*pressure|tire\s*pressure)/.test(text)) return 'tpms';
    if (/(inflator|compressor|air\s*pump)/.test(text)) return 'inflator-compressor';
    if (/(tow\s*hook|tow\s*rope|towing\s*strap|tow\s*strap)/.test(text)) return 'tow-hook-rope';
    if (/(number\s*plate\s*frame|license\s*plate\s*frame|plate\s*holder)/.test(text)) return 'number-plate-frame';
    if (/(trash\s*bin|dust\s*bin|garbage\s*bin)/.test(text)) return 'trash-bin';
    if (/(seat\s*belt\s*(clip|pad|cover)|seatbelt\s*(clip|pad|cover))/.test(text)) return 'seat-belt-accessories';
    return null;
  };

  const getAccessoryImage = (accessoryName: string, description: string): string => {
    const cat = getCategoryForAccessory(accessoryName, description);
    if (cat && imageByCategory[cat]) return imageByCategory[cat];
    return '/images/accessories/generic.svg';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      
      {/* Back Button */}
      <div className="container mx-auto px-4 py-24">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Results
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Product Image & Info */}
          <div className="space-y-6">
            {/* Main Product Card */}
            <Card className="p-8 bg-card shadow-lg">
              <div className="aspect-square bg-secondary/10 rounded-lg flex items-center justify-center mb-6 overflow-hidden">
                <img
                  src={getAccessoryImage(accessory.accessory_name, accessory.description)}
                  alt={accessory.accessory_name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/images/accessories/generic.svg';
                  }}
                />
              </div>

              {/* Product Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  {accessory.final_score.toFixed(1)}% Match
                </Badge>
                <Badge className={getSentimentColor(accessory.sentiment_label)}>
                  {accessory.sentiment_label}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {accessory.dominant_emotion}
                </Badge>
                {qualityPercentage >= 70 && (
                  <Badge className="bg-green-500 text-white">
                    <Sparkles className="h-3 w-3 mr-1" />
                    High Quality
                  </Badge>
                )}
              </div>

              {/* Product Title */}
              <h1 className="text-3xl font-bold mb-2">{accessory.accessory_name}</h1>
              <p className="text-muted-foreground mb-4">
                {accessory.car_brand} - {accessory.car_model}
              </p>

              {/* Price */}
              <div className="mb-6">
                <div className="text-4xl font-bold text-primary">
                  ₹{accessory.price.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Inclusive of all taxes</p>
              </div>

              <Separator className="my-6" />

              {/* Product Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-foreground">
                  {accessory.description || 'Premium quality accessory designed for your vehicle.'}
                </p>
              </div>

              {/* Compatibility */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Compatibility</h3>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-foreground">
                    Compatible with {accessory.car_brand} {accessory.car_model}
                  </span>
                </div>
              </div>
            </Card>

            {/* Quality & Sentiment Details */}
            <Card className="p-6 bg-card shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Product Insights</h3>
              
              <div className="space-y-4">
                {/* Quality Score */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Quality Score</span>
                    <span className="text-sm font-bold">{qualityPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                      style={{ width: `${qualityPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Sentiment Analysis */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Customer Sentiment</span>
                    <Badge className={getSentimentColor(accessory.sentiment_label)}>
                      {accessory.sentiment_label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on customer reviews and ratings
                  </p>
                </div>

                {/* Match Explanation */}
                {accessory.explanation && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-foreground">
                      <TrendingUp className="h-4 w-4 inline mr-2 text-blue-500" />
                      {accessory.explanation}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column - Purchase Options */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="p-6 bg-card shadow-lg sticky top-6">
              <h2 className="text-2xl font-bold mb-6">Purchase Options</h2>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Quantity</label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={incrementQuantity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Price */}
              <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/30">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total Price:</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{(accessory.price * quantity).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleBuyNow}
                  className="w-full h-12 text-lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buy Now
                </Button>
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="w-full h-12 text-lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleWishlist}
                  variant="outline"
                  className="w-full h-12 text-lg"
                >
                  <Heart
                    className={`mr-2 h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                  />
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </Button>
              </div>

              <Separator className="my-6" />

              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-green-500" />
                  <span>Free delivery on orders above ₹500</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span>1 Year Warranty included</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RefreshCcw className="h-5 w-5 text-purple-500" />
                  <span>7 Days Return Policy</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
