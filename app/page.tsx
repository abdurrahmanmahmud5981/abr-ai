import HeroSection from "@/components/hero";
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/data/features";

export default function Home() {
  return (
    <div >
      <div className="grid-background"></div>
      <HeroSection />
      {/* features */}
      <section className="w-full py-12  md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Powerful Features for Your Career Growth </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {
              features.map((feature, index) => (
                <Card key={index} className="border-2 hover:border-primary transition-colors duration-300 ease-in-out">
                  <CardContent className="flex flex-col items-center text-center pt-6">
                    <div className="flex flex-col items-center justify-center ">
                      <feature.icon className="feature-icon h-10 w-10" />
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </section>
      {/* statistics */}
      <section className="w-full py-12  md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Map through statistics data and display cards */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">24/7</h3>
              <p className="text-muted-foreground">AI Support</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">95%+</h3>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">500+</h3>
              <p className="text-muted-foreground">Interview Questions</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">30+</h3>
              <p className="text-muted-foreground">Industries Covered</p>
            </div>
          </div>
        </div>
      </section>
      {/* how it works */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Our process is designed to be simple and effective, guiding you every step of the way.
            </p>
          </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {
              features.map((feature, index) => (
                <Card key={index} className="border-2 hover:border-primary transition-colors duration-300 ease-in-out">
                  <CardContent className="flex flex-col items-center text-center pt-6">
                    <div className="flex flex-col items-center justify-center ">
                      <feature.icon className="feature-icon h-10 w-10" />
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
}
