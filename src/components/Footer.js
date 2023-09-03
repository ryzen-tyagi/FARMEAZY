import React from 'react';
import SimpleReactFooter from 'simple-react-footer';


const Footer = () => {
  // Define
  const description = "Empowering Healthy Choices, One Vegetable at a Time  Discover Freshness.  Delivered to Brighten Every Bite";
  const title = "FARMEAZY";

  const columns = [{
    title: "Products",
    resources: [{
      name: "Fruits",
      link: "/fruits"
    },{
      name: "Vegetables",
      link: "/vegetables"
    },]
  },{
    title: "Services",
    resources: [{
      name: "Buy",
      link: "/Products"
    },{
      name: "Sell",
      link: "/SignUp"
    }]
  },{
    title: "About",
    resources: [{
      name: "",
      link: "/item7"
    },{
      name: "",
      link: "/item8"
    }]
  }];

  return <SimpleReactFooter
    description={description}
    title={title}
    columns={columns}
    linkedin="https://www.linkedin.com/feed/"
    facebook="https://about.meta.com/metaverse/"
    twitter="https://twitter.com/home"
    instagram="https://www.instagram.com/"
    youtube="https://www.youtube.com/"
    pinterest="https://in.pinterest.com/"
    copyright="FarmEazy 2023"
    iconColor="black"
    backgroundColor="darkgrey"
    fontColor="white"
    copyrightColor="darkgrey"
  />;
}

export default Footer;