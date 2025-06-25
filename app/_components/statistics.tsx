import React from 'react'

const Statistics = () => {
    return (
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
    )
}

export default Statistics
