import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Star, Loader2, Heart, Sparkles, Award, CheckCircle2, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Navbar from '../components/navbar';
import AccessoryDetailModal from '../components/AccessoryDetailModal';
import { getSectionedRecommendations, formatPrice, formatScore, getQualityBadgeColor, getSentimentBadgeColor, type UserProfile, type AccessoryRecommendation } from '../lib/api';
import { useToast } from '../hooks/use-toast';
import { useWishlist } from '../context/WishlistContext';
import { toast as sonnerToast } from 'sonner';

interface ResultsProps {
  user: any;
}

export default function Results({ user }: ResultsProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [loading, setLoading] = useState(true);
  const [exactMatchRecommendations, setExactMatchRecommendations] = useState<AccessoryRecommendation[]>([]);
  const [compatibleRecommendations, setCompatibleRecommendations] = useState<AccessoryRecommendation[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedAccessory, setSelectedAccessory] = useState<AccessoryRecommendation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleWishlist = (item: AccessoryRecommendation, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(item.accessory_id)) {
      removeFromWishlist(item.accessory_id);
      sonnerToast.success('Removed from wishlist');
    } else {
      addToWishlist(item);
      sonnerToast.success('Added to wishlist!');
    }
  };

  const handleViewDetails = (accessory: AccessoryRecommendation) => {
    setSelectedAccessory(accessory);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedAccessory(null), 300);
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const profileData = sessionStorage.getItem('userProfile');
        if (!profileData) {
          toast({
            title: "No profile found",
            description: "Please fill out the recommendation form first.",
            variant: "destructive",
          });
          navigate('/finder');
          return;
        }

        const profile: UserProfile = JSON.parse(profileData);
        setUserProfile(profile);

        const response = await getSectionedRecommendations(profile, 6, 6);
        
        if (response.success) {
          setExactMatchRecommendations(response.sections.exact_match.recommendations);
          setCompatibleRecommendations(response.sections.compatible.recommendations);
        } else {
          throw new Error('Failed to get recommendations');
        }
      } catch (error: any) {
        console.error('Error fetching recommendations:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to get recommendations. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [navigate, toast]);

  const handleBackToForm = () => {
    navigate('/finder');
  };

  const totalRecommendations = exactMatchRecommendations.length + compatibleRecommendations.length;

  // Helper: Use provided Cloudinary image links by category, chosen via keyword mapping
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
    'sticker': 'https://pplx-res.cloudinary.com/image/upload/v1764686396/search_images/09324892c5a079ed4754e02f2f70eed9eecadaf5.jpg', // fallback to a neutral image if stickers used
    'armrest': 'https://pplx-res.cloudinary.com/image/upload/v1763973738/search_images/dd6224352e76b0859404050f2be77fdc054db2ca.jpg', // reuse organizer as visual placeholder

    // Extended collection (17 new categories)
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
    'key-holder': '/images/keyholder.jpg',
    'card-holder': 'https://pplx-res.cloudinary.com/image/upload/v1763973738/search_images/dd6224352e76b0859404050f2be77fdc054db2ca.jpg',
    'door-handle-cover': '/images/car door handle cover.jpg',
  };

  const getCategoryForAccessory = (accessoryName: string, description: string): string | null => {
    const name = (accessoryName || '').toLowerCase();
    const desc = (description || '').toLowerCase();
    const text = `${name} ${desc}`;

    // Specific exterior items first (to avoid sunshade/visor overlap)
    if (/(door\s*visor|rain\s*guard|wind\s*deflector)/.test(text)) return 'door-visor';
    if (/(bumper).*guard/.test(text)) return 'bumper-guard';
    if (/(door\s*sill|scuff\s*plate|sill\s*plate)/.test(text)) return 'door-sill';

    // Mats
    if (/(trunk|boot|dicky).*mat/.test(text)) return 'trunk-mat';
    if (/(floor|foot|car)\s*mat/.test(text) || /\b[3791]d\b.*mat/.test(text)) return 'floor-mat';

    // Covers
    if (/seat\s*(cover|cushion)/.test(text)) return 'seat-cover';
    if (/steering.*(cover|grip)/.test(text)) return 'steering-cover';
    if (/(car|body)\s*cover/.test(text) && !/seat/.test(text)) return 'car-cover';

    // Shades & protectors
    if (/(screen\s*(guard|protector)|infotainment|cluster)/.test(text)) return 'screen-protector';
    if (/(sun\s*shade|curtain|sunshade)/.test(text)) return 'sunshade';

    // Holders & chargers
    if (/(phone|mobile).*\b(holder|mount)\b/.test(text)) return 'phone-holder';
    if (/(car)?.*(charger|charging|usb|type-c|qc\s*3\.0)/.test(text)) return 'charger';

    // Keys
    if (/(key)\s*(cover|fob|shell|case)/.test(text)) return 'key-cover';

    // Lights & camera
    if (/(head.?light|fog\s*light|led\s*light|tail\s*light|lamp|ambient\s*light)/.test(text)) return 'light';
    if (/(reverse|parking).*camera|dash\s*cam/.test(text)) return 'camera';

    // Care & cleaning
    if (/(air\s*freshener|perfume|fragrance)/.test(text)) return 'air-freshener';
    if (/(vacuum|car\s*cleaner)/.test(text)) return 'vacuum';
    if (/(organizer|storage|tray|pocket|console)/.test(text)) return 'organizer';
    if (/(wiper|washer)/.test(text)) return 'wiper';

    // Exterior misc
    if (/(antenna|shark\s*fin)/.test(text)) return 'antenna';
    if (/(roof\s*(rail|rack|carrier))/.test(text)) return 'roof-rail';

    // Misc
    if (/(dashboard|dash\s*cover|dash\s*mat)/.test(text)) return 'dashboard';
    if (/(sticker|decal|graphics|film|reflective|door\s*handle\s*protector|anti\s*fog|anti\s*rain|door\s*sill\s*(sticker|protector|edge))/.test(text)) return 'sticker-film';
    if (/(armrest|arm\s*rest|center\s*console\s*armrest|armrest\s*cushion)/.test(text)) return 'armrest';

    // Extended categories detection
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
    if (/(key\s*holder|key\s*chain|key\s*ring|keychain|keyring)/.test(text)) return 'key-holder';
    if (/(card\s*holder|visiting\s*card|business\s*card|document\s*holder)/.test(text)) return 'card-holder';
    if (/(door\s*handle\s*(cover|protector|guard)|handle\s*cover)/.test(text)) return 'door-handle-cover';

    return null;
  };

  const getAccessoryImage = (accessoryName: string, description: string): string => {
    const cat = getCategoryForAccessory(accessoryName, description);
    if (cat && imageByCategory[cat]) return imageByCategory[cat];
    return '/images/accessories/generic.svg';
  };

  // Recommendation Card Component
  const RecommendationCard = ({ 
    item, 
    index, 
    sectionType 
  }: { 
    item: AccessoryRecommendation; 
    index: number; 
    sectionType: 'exact' | 'compatible';
  }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50">
      <CardHeader className="pb-3">
        {/* Accessory Image */}
        <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
          <img 
            src={getAccessoryImage(item.accessory_name, item.description)}
            alt={item.accessory_name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = '/images/accessories/generic.svg';
            }}
          />
        </div>
        
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              #{index + 1}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => handleToggleWishlist(item, e)}
            >
              <Heart 
                className={`h-4 w-4 ${isInWishlist(item.accessory_id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
              />
            </Button>
          </div>
          <div className="flex flex-col items-end gap-1">
            {sectionType === 'exact' && (
              <Badge className="bg-green-600 text-white text-xs">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                EXACT MATCH
              </Badge>
            )}
            {sectionType === 'compatible' && (
              <Badge className="bg-blue-600 text-white text-xs">
                <Globe className="w-3 h-3 mr-1" />
                COMPATIBLE
              </Badge>
            )}
            <Badge className={`${getQualityBadgeColor(item.quality_score)} text-white text-xs`}>
              <Star className="w-3 h-3 mr-1" />
              {formatScore(item.quality_score)}
            </Badge>
            <Badge className={`${getSentimentBadgeColor(item.sentiment_score)} text-white text-xs`}>
              <Heart className="w-3 h-3 mr-1" />
              {formatScore(item.sentiment_score)}
            </Badge>
          </div>
        </div>
        
        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {item.accessory_name}
        </CardTitle>
        
        <div className="flex items-center gap-1 mt-2">
          <Award className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary">
            {formatScore(item.final_score)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <span className="text-3xl font-bold text-primary">
            {formatPrice(item.price)}
          </span>
          
          <div className="text-sm text-muted-foreground">
            <p><strong>Brand:</strong> {item.car_brand}</p>
            <p><strong>Model:</strong> {item.car_model}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            variant="outline"
            onClick={() => handleViewDetails(item)}
          >
            <Package className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button 
            className="flex-1" 
            variant="default"
            onClick={() => navigate('/buy', { state: { accessory: item } })}
          >
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
        <Navbar user={user} />
        <div className="pt-24 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Finding Your Perfect Accessories...</h2>
                <p className="text-muted-foreground">
                  Our AI is analyzing 1,269 accessories with 47 features each
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <Navbar user={user} />
      
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={handleBackToForm}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Form
            </Button>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Personalized for {userProfile?.car_brand} {userProfile?.car_model || 'Owner'}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold font-['Space_Grotesk']">
                Your TOP Recommendations
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Personalized based on your car, budget, and preferences
              </p>
            </div>
          </div>

          {/* Stats Summary */}
          {userProfile && (
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary">{totalRecommendations}</div>
                  <p className="text-sm text-muted-foreground">Total Recommendations</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(userProfile.budget_min)} - {formatPrice(userProfile.budget_max)}
                  </div>
                  <p className="text-sm text-muted-foreground">Your Budget</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary">
                    {exactMatchRecommendations.length > 0 ? formatScore(exactMatchRecommendations[0].final_score) : '-'}
                  </div>
                  <p className="text-sm text-muted-foreground">Top Match Score</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* SECTION 1: Exact Match Accessories */}
          {exactMatchRecommendations.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6 bg-primary/10 p-4 rounded-lg border-2 border-primary/30">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Accessories for Your {userProfile?.car_brand} {userProfile?.car_model}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    ✅ These accessories are specifically designed for your car
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exactMatchRecommendations.map((item, index) => (
                  <RecommendationCard 
                    key={item.accessory_id} 
                    item={item} 
                    index={index} 
                    sectionType="exact" 
                  />
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: Compatible/Universal Accessories */}
          {compatibleRecommendations.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6 bg-accent/10 p-4 rounded-lg border-2 border-accent/30">
                <Globe className="w-6 h-6 text-accent flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Other Compatible/Universal Accessories
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    🌐 These accessories are cross-compatible or universal fit
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {compatibleRecommendations.map((item, index) => (
                  <RecommendationCard 
                    key={item.accessory_id} 
                    item={item} 
                    index={index} 
                    sectionType="compatible" 
                  />
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {totalRecommendations === 0 && (
            <Card className="text-center p-12">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Recommendations Found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your budget range or quality threshold
              </p>
              <Button onClick={handleBackToForm}>
                Adjust Preferences
              </Button>
            </Card>
          )}

          {/* Call to Action */}
          {totalRecommendations > 0 && (
            <div className="mt-12 text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full text-green-600 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                These recommendations are personalized just for you!
              </div>
              <div className="flex justify-center">
                <Button size="lg" onClick={handleBackToForm}>
                  Try Different Preferences
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <AccessoryDetailModal
        accessory={selectedAccessory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
