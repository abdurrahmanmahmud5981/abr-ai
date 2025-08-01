import { Card, CardContent } from "@/components/ui/card"
import { features } from "@/data/features"

const PowerfulFeatures = () => {
  return (
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
  )
}

export default PowerfulFeatures
