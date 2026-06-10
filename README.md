# WEB103 Project 1 - *Glow Guide*

Submitted by: Averie Ahn

About this web app: **Glow Guide is a makeup lookbook web app that displays different makeup styles for different aesthetics, occasions, and skill levels. Users can browse makeup looks on the homepage and click each item to view a detailed page with all information about that look, including products, difficulty, time, occasion, and tips.**

Time spent: **5** hours

## Required Features

The following **required** functionality is completed:

* [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
* [x] **The web app displays a title**
* [x] **The web app displays at least five unique list items, each with at least three displayed attributes (such as title, text, and image)**
* [x] **The user can click on each item in the list to see a detailed view of it, including all database fields**

  * [x] **Each detail view should be a unique endpoint, such as `localhost:3000/looks/soft-glam` and `localhost:3000/looks/clean-girl-makeup`**
  * [ ] *Note: When showing this feature in the video walkthrough, please show the unique URL for each detailed view. We will not be able to give points if we cannot see the implementation*
* [x] **The web app serves an appropriate 404 page when no matching route is defined**
* [x] **The web app is styled using Picocss**

The following **optional** features are implemented:

* [x] The web app displays items in a unique format, such as cards rather than lists or animated list items

The following **additional** features are implemented:

* [x] Added a makeup-themed design with styled cards for each makeup look
* [x] Added detailed pages for each makeup look with products, occasion, difficulty, time, and makeup tips
* [x] Added images for each makeup look to make the app more visually appealing

## Video Walkthrough

**Note: please be sure to show the homepage, at least two unique detail page URLs, and the 404 page in your walkthrough.**

Here's a walkthrough of implemented required features:

<img src='https://imgur.com/a/YOVhp6E' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with imgur

<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux.
-->

## Notes

One challenge I encountered while building the app was creating separate routes for each makeup look so that every item had its own unique detail page. I also had to make sure each makeup look shared the same attributes, such as name, category, difficulty, occasion, products, description, image, and tip. Styling the cards with Picocss helped make the homepage cleaner and easier to navigate.

## License

Copyright 2026 Averie Ahn

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
