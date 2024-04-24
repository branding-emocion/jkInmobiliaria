import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
      >
        <CarouselContent>
          <CarouselItem className="">
            <img
              src={`/blog/blog1.jpg`}
              className="h-full w-full object-cover overflow-hidden  "
              alt="slider 1"
            />
          </CarouselItem>
          <CarouselItem className="">
            <img
              src={`/blog/blog1.jpg`}
              className="h-full w-full object-cover overflow-hidden  "
              alt="slider 1"
            />
          </CarouselItem>{" "}
          <CarouselItem className="">
            <img
              src={`/blog/blog1.jpg`}
              className="h-full w-full object-cover overflow-hidden  "
              alt="slider 1"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HomePage;
