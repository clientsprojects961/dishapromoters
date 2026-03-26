'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ChevronRight, MapPin, Home as HomeIconLucide, Building2, Landmark, Heart, Search, Menu, X, MessageCircle, Phone, Mail, Star, ArrowRight, ChevronLeft } from 'lucide-react'
import LoadingScreen from '@/components/loading-screen'

const heroImages = [
  '/hero-1.jpg',
  '/hero-2.jpg',
  '/hero-3.jpg',
  '/hero-4.jpg',
]

const properties = [
  {
    id: 1,
    name: 'Sunshine Heights Apartments',
    location: 'Sakchi, Jamshedpur',
    price: '₹45 L - 75 L',
    area: '1200-1800 sqft',
    beds: '2-3 BHK',
    type: 'Apartments',
    image: '/property-1.jpg',
    featured: true,
  },
  {
    id: 2,
    name: 'Royal Villa Estates',
    location: 'Adityapur, Jamshedpur',
    price: '₹1.2 Cr - 1.8 Cr',
    area: '3500-4500 sqft',
    beds: '4-5 BHK',
    type: 'Villas',
    image: '/property-2.jpg',
    featured: true,
  },
  {
    id: 3,
    name: 'Prime Commercial Space',
    location: 'Bistupur, Jamshedpur',
    price: '₹25 L - 50 L',
    area: '1000-2000 sqft',
    beds: 'Commercial',
    type: 'Commercial',
    image: '/property-3.jpg',
    featured: false,
  },
  {
    id: 4,
    name: 'Residential Land Plots',
    location: 'Porahat, Jamshedpur',
    price: '₹30 L - 60 L',
    area: '1000-2000 sqft',
    beds: 'Plots',
    type: 'Plots',
    image: '/property-4.jpg',
    featured: false,
  },
  {
    id: 5,
    name: 'Greenwood Apartments',
    location: 'Telco, Jamshedpur',
    price: '₹40 L - 70 L',
    area: '1100-1700 sqft',
    beds: '2-3 BHK',
    type: 'Apartments',
    image: '/property-1.jpg',
    featured: false,
  },
  {
    id: 6,
    name: 'Luxury Villa Complex',
    location: 'Ghatshila, Jamshedpur',
    price: '₹1.5 Cr - 2.2 Cr',
    area: '4000-5500 sqft',
    beds: '4-5 BHK',
    type: 'Villas',
    image: '/property-2.jpg',
    featured: false,
  },
  {
    id: 7,
    name: 'Business Hub Commercial',
    location: 'Golmuri, Jamshedpur',
    price: '₹30 L - 60 L',
    area: '1200-2500 sqft',
    beds: 'Commercial',
    type: 'Commercial',
    image: '/property-3.jpg',
    featured: false,
  },
  {
    id: 8,
    name: 'Premium Plot Development',
    location: 'Mango, Jamshedpur',
    price: '₹35 L - 70 L',
    area: '1200-2500 sqft',
    beds: 'Plots',
    type: 'Plots',
    image: '/property-4.jpg',
    featured: false,
  },
  {
    id: 9,
    name: 'Skyline Residence',
    location: 'Kadma, Jamshedpur',
    price: '₹50 L - 85 L',
    area: '1400-2000 sqft',
    beds: '3-4 BHK',
    type: 'Apartments',
    image: '/property-1.jpg',
    featured: false,
  },
  {
    id: 10,
    name: 'Riverside Villas',
    location: 'Zamonia, Jamshedpur',
    price: '₹1.3 Cr - 1.9 Cr',
    area: '3800-4800 sqft',
    beds: '4-5 BHK',
    type: 'Villas',
    image: '/property-2.jpg',
    featured: false,
  },
  {
    id: 11,
    name: 'Corporate Office Spaces',
    location: 'Dimna, Jamshedpur',
    price: '₹40 L - 75 L',
    area: '1500-3000 sqft',
    beds: 'Commercial',
    type: 'Commercial',
    image: '/property-3.jpg',
    featured: false,
  },
  {
    id: 12,
    name: 'Integrated Township',
    location: 'Jadugora, Jamshedpur',
    price: '₹28 L - 55 L',
    area: '800-1800 sqft',
    beds: 'Plots',
    type: 'Plots',
    image: '/property-4.jpg',
    featured: false,
  },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [selectedPropertyType, setSelectedPropertyType] = useState('all')

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when navigating
    const handleLinkClick = () => {
      setMobileMenuOpen(false)
    }
    document.addEventListener('click', handleLinkClick)
    return () => document.removeEventListener('click', handleLinkClick)
  }, [])

  // Hero carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const nextHero = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length)
  }

  const prevHero = () => {
    setCurrentHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const filteredProperties = selectedPropertyType === 'all'
    ? properties
    : properties.filter((p) => p.type === selectedPropertyType)

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 relative">
              <Image
                src="/logo.png"
                alt="Disha Promoters & Realtors"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className={`font-bold text-lg transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-white'}`}>Disha</span>
              <span className={`text-xs transition-colors duration-300 ${scrolled ? 'text-primary/70' : 'text-white/70'}`}>Promoters & Realtors</span>
            </div>
          </Link>

          <nav className="hidden md:flex gap-8">
            <Link href="#properties" className={`hover:text-primary transition-colors font-medium ${scrolled ? 'text-foreground' : 'text-white'}`}>Properties</Link>
            <Link href="#about" className={`hover:text-primary transition-colors font-medium ${scrolled ? 'text-foreground' : 'text-white'}`}>About</Link>
            <Link href="#contact" className={`hover:text-primary transition-colors font-medium ${scrolled ? 'text-foreground' : 'text-white'}`}>Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Schedule Tour
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-primary/15 rounded-lg transition-all duration-300 text-foreground hover:text-primary"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <nav className="flex flex-col p-4 gap-4">
              <Link href="#properties" className="text-foreground hover:text-primary transition-colors">Properties</Link>
              <Link href="#about" className="text-foreground hover:text-primary transition-colors">About</Link>
              <Link href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
              <Button className="w-full bg-primary hover:bg-primary/90">Schedule Tour</Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Carousel Section */}
      <section className="pt-20 relative h-screen md:h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Carousel Images */}
        {heroImages.map((image, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentHeroIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Property ${idx + 1}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevHero}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextHero}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHeroIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentHeroIndex ? 'bg-primary w-8' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Hero Content - Search Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
          <div className="text-center text-white mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg">
              Find Your Dream Home
            </h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow-lg">
              Discover premium properties in Jamshedpur with Disha Promoters & Realtors
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-5 md:p-7">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search location, project, or property type..."
                  className="w-full border-0 focus-visible:ring-primary bg-gray-50 placeholder:text-gray-500 rounded-lg"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                <Search size={20} className="mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Property Type Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative -mt-20 mb-12 z-30">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 overflow-x-auto border border-gray-100">
          <div className="flex gap-2 md:gap-4 justify-start md:justify-center">
            {[
              { label: 'All', value: 'all' },
              { label: 'Apartments', value: 'Apartments' },
              { label: 'Villas', value: 'Villas' },
              { label: 'Commercial', value: 'Commercial' },
              { label: 'Plots', value: 'Plots' },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedPropertyType(type.value)}
                className={`px-5 md:px-7 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap text-sm md:text-base ${
                  selectedPropertyType === type.value
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Property Card Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-bold text-foreground text-2xl">PREMIUM LISTING</h3>
                <span className="bg-primary text-white px-4 py-1 rounded-full text-xs font-semibold">Featured</span>
              </div>
              <p className="text-primary font-bold text-3xl mb-3">₹1.94 Cr</p>
              <p className="text-foreground text-base mb-3 font-semibold">3 BHK Premium Apartment | 1695 SFT | All Inclusive + GST</p>
              <p className="text-foreground/70 text-sm mb-6 flex items-center gap-2">
                <MapPin size={18} className="text-primary" /> Sakchi, Jamshedpur
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                Explore Now <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-2">Featured Properties</h2>
          <p className="text-foreground/60">Handpicked premium properties curated just for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {properties.filter((p) => p.featured).map((property) => (
            <Card
              key={property.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100 rounded-xl"
            >
              <div className="relative h-80 overflow-hidden bg-gray-200">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleWishlist(property.id)}
                  className="absolute top-4 right-4 bg-white rounded-full p-3 hover:bg-primary hover:text-white transition-all duration-300 z-10 shadow-lg hover:shadow-xl hover:scale-110"
                >
                  <Heart
                    size={22}
                    fill={wishlist.includes(property.id) ? 'currentColor' : 'none'}
                    className={wishlist.includes(property.id) ? 'text-red-500' : 'text-gray-600'}
                  />
                </button>
              </div>
              <div className="p-7">
                <h3 className="font-bold text-xl text-foreground mb-2">{property.name}</h3>
                <p className="text-primary font-bold text-2xl mb-3">{property.price}</p>
                <p className="text-sm text-foreground/70 flex items-center gap-2 mb-5">
                  <MapPin size={16} className="text-primary" /> {property.location}
                </p>
                <div className="flex gap-4 text-sm text-foreground/60 mb-7 pb-7 border-b border-gray-200">
                  <span className="font-medium">{property.beds}</span>
                  <span>•</span>
                  <span className="font-medium">{property.area}</span>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold py-3 transition-all duration-300 hover:scale-105">
                  View Details <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">All Properties</h2>
          <p className="text-foreground/60 mb-8">Browse our extensive collection of premium properties</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100 rounded-xl cursor-pointer hover:border-primary/30 hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-primary text-white px-4 py-1 rounded-full text-xs font-semibold shadow-md">
                    {property.type}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 text-base">{property.name}</h3>
                  <p className="text-primary font-bold text-lg mb-2">{property.price}</p>
                  <p className="text-xs text-foreground/70 flex items-center gap-1 mb-4">
                    <MapPin size={14} className="text-primary" /> {property.location}
                  </p>
                  <button
                    onClick={() => toggleWishlist(property.id)}
                    className="w-full py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-semibold transition-all duration-300 text-sm"
                  >
                    {wishlist.includes(property.id) ? '❤️ Wishlist' : '♡ Wishlist'}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="contact" className="bg-secondary/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Visit Our Office</h2>
            <p className="text-foreground/60">Located in the heart of Jamshedpur</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="w-full h-96 md:h-[500px] bg-muted rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.5399451345346!2d84.89457762346899!3d22.799033979999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e2d8e2e2e2e1%3A0x0!2sAditya%20Raza%20Mansion%2C%20Ambagan%2C%20Sakchi!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <Card className="p-8 border border-gray-100 shadow-lg rounded-xl bg-white hover:shadow-xl transition-all duration-300">
                <h3 className="font-bold text-xl text-foreground mb-8">📞 Get In Touch</h3>
                <div className="space-y-7">
                  <div className="flex gap-4">
                    <Phone size={24} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-foreground/70 font-semibold">Phone</p>
                      <a href="tel:+919934128111" className="text-primary font-bold text-lg hover:text-primary/80 transition-colors">
                        +91 99341 28111
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4 border-t border-gray-100 pt-7">
                    <Mail size={24} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-foreground/70 font-semibold">Email</p>
                      <a href="mailto:info@dishapromoters.com" className="text-primary font-semibold hover:text-primary/80 transition-colors break-all">
                        info@dishapromoters.com
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4 border-t border-gray-100 pt-7">
                    <MapPin size={24} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-foreground/70 font-semibold mb-2">Address</p>
                      <p className="text-foreground font-semibold leading-relaxed">
                        Third Floor, Aditya Raza Mansion<br/>
                        22 Ambagan, Sakchi<br/>
                        Jamshedpur, Jharkhand 831001
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-0 shadow-lg bg-primary text-white rounded-xl hover:shadow-xl transition-all duration-300">
                <h3 className="font-bold text-lg mb-4">Office Hours</h3>
                <p className="text-sm mb-2">Monday - Friday: 9:30 AM - 6:00 PM</p>
                <p className="text-sm mb-6 text-white/80">Saturday: 10:00 AM - 4:00 PM</p>
                <Button className="w-full bg-white text-primary hover:bg-white/90 font-semibold rounded-lg py-3 transition-all duration-300 hover:scale-105">
                  Schedule a Tour
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-white to-gray-50 rounded-2xl my-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Disha Promoters & Realtors?</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-medium">
            Trusted by thousands of happy clients with ⭐ 4.7 Google rating
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Building2, title: '500+ Properties', desc: 'Verified listings across all categories' },
            { icon: Star, title: '4.7★ Rating', desc: 'Trusted by thousands of clients' },
            { icon: Search, title: 'Expert Consultation', desc: 'Personalized guidance for best deals' },
            { icon: HomeIconLucide, title: '24/7 Support', desc: 'Always ready to assist you' },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <Card key={idx} className="p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 rounded-xl bg-white hover:-translate-y-1 group">
                <div className="flex justify-center mb-5">
                  <div className="bg-primary/15 p-5 rounded-full group-hover:bg-primary/25 transition-all duration-300">
                    <Icon size={36} className="text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-primary to-primary/95 text-white mt-20 rounded-t-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="Logo" width={32} height={32} className="invert" />
                <h4 className="font-bold text-lg">Disha Promoters</h4>
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Your trusted partner in finding premium real estate solutions in Jamshedpur. 4.7★ rated.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-base mb-5 text-white">Quick Links</h4>
              <ul className="space-y-3 text-sm text-primary-foreground/80">
                <li><Link href="#properties" className="hover:text-white transition-colors font-medium">Properties</Link></li>
                <li><Link href="#about" className="hover:text-white transition-colors font-medium">About Us</Link></li>
                <li><Link href="#contact" className="hover:text-white transition-colors font-medium">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-5 text-white">Property Types</h4>
              <ul className="space-y-3 text-sm text-primary-foreground/80">
                <li><button onClick={() => setSelectedPropertyType('Apartments')} className="hover:text-white transition-colors font-medium hover:font-bold">Apartments</button></li>
                <li><button onClick={() => setSelectedPropertyType('Villas')} className="hover:text-white transition-colors font-medium hover:font-bold">Villas</button></li>
                <li><button onClick={() => setSelectedPropertyType('Commercial')} className="hover:text-white transition-colors font-medium hover:font-bold">Commercial</button></li>
                <li><button onClick={() => setSelectedPropertyType('Plots')} className="hover:text-white transition-colors font-medium hover:font-bold">Plots</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-5 text-white">Contact Info</h4>
              <ul className="space-y-3 text-sm text-primary-foreground/80">
                <li className="font-medium">📞 +91 99341 28111</li>
                <li className="font-medium">📧 info@dishapromoters.com</li>
                <li className="font-medium">📍 Jamshedpur, Jharkhand</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/30 pt-8">
            <p className="text-center text-sm text-primary-foreground/80">
              Developed by Adarsh Sinha © 2024 Disha Promoters & Realtors. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Desktop Floating WhatsApp Button */}
      <a
        href="https://wa.me/97209694653"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-8 right-8 bg-[#25D366] hover:bg-[#1ebd58] text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-125 z-40 hover:animate-bounce"
        aria-label="Contact us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.908 1.342l-.384.214-.398-.013c-1.644 0-3.059.474-4.255 1.411-.604.504-1.055 1.116-1.344 1.832-.289.716-.433 1.49-.433 2.322 0 .844.144 1.624.433 2.344.289.72.74 1.332 1.344 1.836 1.2.94 2.611 1.414 4.26 1.414.13 0 .264-.005.398-.013l.383.213c1.41 1.02 3.041 1.537 4.908 1.537 1.867 0 3.498-.517 4.908-1.537l.383-.213c.134.008.268.013.398.013 1.649 0 3.06-.474 4.261-1.414.604-.504 1.055-1.116 1.344-1.836.289-.72.433-1.5.433-2.344 0-.832-.144-1.606-.433-2.322-.289-.716-.74-1.328-1.344-1.832-1.2-.937-2.611-1.411-4.261-1.411a9.87 9.87 0 00-4.908 1.342l-.383-.214z"/>
        </svg>
      </a>

      {/* Mobile Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 shadow-2xl z-40">
        <div className="grid grid-cols-2 gap-3 p-4">
          <a
            href="tel:+919934128111"
            className="bg-primary hover:bg-primary/90 text-white rounded-lg py-3 font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <Phone size={20} />
            <span>Call</span>
          </a>
          <a
            href="https://wa.me/97209694653"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#1ebd58] text-white rounded-lg py-3 font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.908 1.342l-.384.214-.398-.013c-1.644 0-3.059.474-4.255 1.411-.604.504-1.055 1.116-1.344 1.832-.289.716-.433 1.49-.433 2.322 0 .844.144 1.624.433 2.344.289.72.74 1.332 1.344 1.836 1.2.94 2.611 1.414 4.26 1.414.13 0 .264-.005.398-.013l.383.213c1.41 1.02 3.041 1.537 4.908 1.537 1.867 0 3.498-.517 4.908-1.537l.383-.213c.134.008.268.013.398.013 1.649 0 3.06-.474 4.261-1.414.604-.504 1.055-1.116 1.344-1.836.289-.72.433-1.5.433-2.344 0-.832-.144-1.606-.433-2.322-.289-.716-.74-1.328-1.344-1.832-1.2-.937-2.611-1.411-4.261-1.411a9.87 9.87 0 00-4.908 1.342l-.383-.214z"/>
            </svg>
            <span>Chat</span>
          </a>
        </div>
      </div>

      {/* Add padding to body on mobile to prevent overlap with sticky bar */}
      <div className="md:hidden h-20"></div>
    </div>
  )
}
