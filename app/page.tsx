import HeroSection from "@/components/hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { faqs } from "@/data/faqs";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import Image from "next/image";

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
              howItWorks.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center pt-6" >
                  <div className=" h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon />
                  </div>
                  <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
                  <p className="text-muted-foreground mt-2">{item.description}</p>
                </div>
              ))
            }
          </div>
        </div>
      </section>
      {/* testimonials */}
      <section className="w-full py-12  md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1  md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {
              testimonial.map((testimonial, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="flex flex-col items-center text-center pt-6">
                    <div className=" flex flex-col space-y-4">
                      <div className="flex items-center justify-start text-start space-x-4">
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.author}
                            width={50}
                            height={50}
                            className="rounded-full object-cover border-2 border-primary/20"
                          />
                        </div>
                        <div className="">
                          <p className=" font-semibold ">{testimonial.author}</p>
                          <p className="text-muted-foreground text-sm">{testimonial.role} at {testimonial.company}</p>
                        </div>
                      </div>
                      <blockquote >
                        <p className="text-muted-foreground italic relative text-start">
                          <span className="text-3xl text-primary absolute -top-4 -left-5 "> &quot;</span>
                          {testimonial.quote}
                          <span className="text-3xl text-primary absolute -bottom-4"> &quot;</span>
                        </p>
                      </blockquote>

                    </div>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find answers to the most common questions about our service.
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <Accordion type="single" collapsible>
              {
                faqs.map((faq, index) => (
                  <AccordionItem value={faq.question} key={index} className="border-b border-muted/40">
                    <AccordionTrigger>
                      <h3 className="text-xl font-semibold">{faq.question}</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground mt-2">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))
              }
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
