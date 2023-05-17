# How to use

## Setup

1. From [index.html](./index.html), copy ``` <div id="dynamicNav"> ``` (lines 45 to 57) into your ``` <nav> ```
1. Copy the styling from [dynamicNav.css](./css/dynamicNav.css) into your stylesheet
1. Copy [dynamicNav.js](./js/dynamicNav.js) into your project
1. From [ids.js](./js/ids.js), copy lines 10, 21, and 26 into your ``` ids.js ```

## Adding sections

1. Wrap each of your sections in ``` <section> </section> ``` tags
1. Add the ``` data-index="" ``` attribute to each section you want to include in the navbar
1. Add the section's title between the quotes
    - Ex: ``` <section data-index="Section Title"> ```

## Notes

- Any html tag with the ```data-index``` attribute will be added to the navbar&mdash;the tag doesn't have to be a ```<section>```
- More than 4 sections may require updates to the styling

## Live Examples

- [Dynamic Navbar Template](https://ids.jacob.day/dynamic-navbar)
- Published IDS example: [Hoosier Heroes](https://specials.idsnews.com/iu-basketball-guide-2022-2023/)
