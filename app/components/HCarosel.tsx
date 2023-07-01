import React from "react";
import { SliderProps } from "@chakra-ui/react";
import Slider from "./Slider";
import { PrevArrow, NextArrow } from "./SliderArrow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface HCarouselProps {
  children: React.ReactNode[];
  settings: any;
}

class HCarousel extends React.Component<HCarouselProps> {
  render() {
    let { children, settings } = this.props;
    let breakpoints = [480, 767, 1200, 1400];

    var finalSettings = {
      dots: false,
      infinite: false,
      speed: 500,
      initialSlide: 0,
      slidesToShow: 4,
      slidesToScroll: 4,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
      ...settings,
    };
    return <Slider {...finalSettings}>{children}</Slider>;
  }
}

export default HCarousel;
