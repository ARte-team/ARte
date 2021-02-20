# Design

## Overview
**ARte** (**Augmented Reality to educate**) is a smartphone **application**, available as a web app based on the **IoT** paradigm, developed for the *Sapienza University of Rome*'s [Arte Classica Museum](https://web.uniroma1.it/polomuseale/museo-arte-classica) which aims to improve the **interaction** between users and **artworks** and **social distancing** (COVID-19 era), providing useful information to the museum's managers at the same time.  
Visitors will be able to perform various actions on their device (some based on IoT data) in order to toggle features based on the **Augmented Reality** technology. This makes use of the **smartphone's camera** and each framed artwork will appear as a **3D model** in the scene.

The available functionalities, provided to offer a better user experience, are the following:
- **Animation**: the artwork 3D model will no longer be static but it will be animated
- **Contextualization**: the appearance of the room will be modified according to the artwork in order to reproduce its historical setting
- **Dynamic Artwork Reimagination**: a colored filter will be generated and applied to the artwork and the background based on the real-time visitors’ flow inside the room
- **Interactive Music**: the music will be generated and played based on the real-time visitors’ flow inside the room
- **Rebuilding of missing components**: the missing parts of the artwork will be rebuilt to recover its original appearance
- **Storytelling**: the artwork will tell a story or a fact about itself

NB: The Animation and Rebuilding of missing components are currently missing by design and may be implemented in the future.

## Why ARte?
The world is continuously evolving and the way to visit a museum is not an exception. Just looking at artworks is no longer enough, visitors want to interact with them. A clear initial proof of this concept was given to us by preliminary interviews we carried out and then was confirmed by analyzing the answers in the [first survey](https://docs.google.com/forms/d/1Dy7tSe--2VEJ7W5ga6v32OjPgh2kgCQf6i635NsuEJ0/viewanalytics) we conducted: 91,2% of the users like to visit museums, but also 93,8% of them admit that they would like to have some different kinds of interactions with the artworks with respect to the nowadays available ones.  

<p align="center"><img src="/img/Charts/Survey%201/Would%20you%20like%20to%20have%20different%20types%20of%20interaction%20with%20the%20artworks_.svg"></p>

Moreover, some in the small percentage who don’t like to visit museums add that they don’t like it because *“most of the time the visit is not involving enough”* or because a simple visit may be *“boring”*. Furthermore, when we asked what they expected to find inside the *Sapienza's Arte Classica Museum* (in terms of artworks and services related to them), some answers focused again on interactivity.
After some time, we proposed a [second survey](https://docs.google.com/forms/d/11A8Guf2jv1bYf-7WIxithKmYAJZCRF3bdkaXESRKFlY/viewanalytics) in order to confirm the aforementioned concept and most of the people responded that they would use an app to enhance their visit to a museum. 

<p align="center"><img src="/img/Charts/Survey%202/Would%20you%20use%20an%20app%20to%20improve%20your%20experience%20in%20visiting%20a%20museum_.svg"></p>

In addition, half of the people who answered would be tempted to go to a museum just knowing that they can interact with artworks via the ARte web app.

<p align="center"><img src="/img/Charts/Survey%202/Do%20you%20think%20the%20app%20can%20tempt%20you%20to%20visit%20a%20museum%20you%20would%20never%20had%20visited%20without_.svg"></p>

In conclusion, the need we identified is real and is also justified by several investments done by some museums in the world like *The National Museum of Singapore*, *The Art Gallery of Ontario (Toronto)* and *The Smithsonian Institution (Washington D.C.)*.

Quoting some of them,
*The Art Gallery of Ontario (Toronto)* proposes the *Reblink* mobile application by which visitors, using their phones or tablets, can see the subjects come alive and be transported into our 21st-century reality while
*The Smithsonian Institution (Washington D.C.)* offers the *Skin and bones* mobile application (for Apple devices) by which visitors can bring the exposed skeletons to life via 3D models that reproduce their original appearance and see how they would have moved.

To fill this gap, we selected some potential features, among those proposed in the second survey, for the smartphone web app based on audience preferences: **Animation**, **Contextualization**, **Rebuilding of missing components** and **Storytelling**.
In the end, we conducted a last [3rd survey](https://docs.google.com/forms/d/1CCmUVQD0STFRPkQpCFzw4UYprfHkEvRJJFHbHnFnGvA/viewanalytics) to summarize and confirm the above and to get feedback on the possible introduction of two new IoT features for the web app that represent a trade-off between visitor’s interaction and the need for an actual IoT implementation: **Dynamic Artwork Reimagination** and **Interactive Music**.
The reaction of the potential users was once again impressive and satisfying:
none of the people who responded would not use an app to improve their museum visit experience

<p align="center"><img src="/img/Charts/Survey%203/Would%20you%20use%20an%20app%20to%20improve%20your%20experience%20in%20visiting%20a%20museum_%20(1).svg"></p>

and the results showed very consistent interest in those features which allow users to obtain graphical, visual and sound effects.

<p align="center"><img src="/img/Charts/Survey%203/From%201%20to%205%2C%20in%20which%201%20express%20the%20minimum%20approval%20and%205%20the%20maximum%2C%20how%20much%20interested%20are%20you%20in%20the%20functionalities%20about%20artworks__.svg"></p>

Like the second survey, this time we asked questions about the UI and UX again based on the actual implementation of the web app rather than mockups. Results show that our work has been appreciated.

<p align="center"><img src="/img/Charts/Survey%203/Do%20you%20think%20the%20app%20is%20overall%20simple%20to%20use_.svg"></p>

A final result we can be proud of is the uniqueness of the idea as shown from the following chart.

<p align="center"><img src="/img/Charts/Survey%203/Have%20you%20ever%20used%20a%20similar%20app%20during%20a%20museum_s%20visit_.svg"></p>

If you are interested in all questions we proposed to the audience and the answers we received, you can check the survey results by clicking the links you find above or in the README document.

In conclusion, we want to thank all of you who participated in the surveys and helped us move in the right direction, you have been fundamental.

## User Personas
The analysis of such data also allowed us to define three user personas (a fictional representation of three people belonging to three different groups of our audience):
- Maurizio Pagani, an employee
- Antonio Fuentes, a freelance
- Martina Felici, a student

<p align="center"><img src="/img/Charts/Survey%203/Occupation%20(1).svg"></p>

<p align="center"><img src="/img/user_employee2.png"></p>

<p align="center"><img src="/img/user_freelance2.png"></p>

<p align="center"><img src="/img/user_student2.png"></p>

What resulted was that each group generally prefers a different feature, respectively the **Dynamic Artwork Reimagination**, the **Contextualization** and the **Storytelling**. In this way, we individuated the needs of our users and we could focus on required functionalities, also privileging the ones with a more pronounced IoT factor.


## User case scenarios
To give you a better idea of our product, here you can find a storyboard for each persona which represents a possibly user case scenario.

#### Storyboard of an employee: (Dynamic Artwork Reimagination)
<p align="center"><img src="/img/storyboard_reimagination.png"></p>

#### Storyboard of a freelance: (Storytelling)
<p align="center"><img src="/img/storyboard_storytelling2.png"></p>

#### Storyboard of a student: (Contextualization)
<p align="center"><img src="/img/storyboard_contextualization2.png"></p>


## Museum’s managers
In addition to visitors, we have another type of user who doesn’t use the ARte web app and that we haven’t mentioned so far: the museum’s manager. Few people belong to this group and are interested in **analyzing data** for statistical purposes in order to get useful information for the museum. To meet this demand, we developed a website where the museum’s managers, once logged in, can access data via a simple **dashboard**.

But what data? Ever heard about **crowdsensing**? It is a technique where a large group of individuals having mobile devices capable of sensing and computing collectively share information. Such data are sent completely **anonymously** by the visitors’ smartphones, after an explicit agreement of the user, while using the ARte web app.

However, smartphones are not the only devices that collect data because several **STM32 Nucleo boards** are installed in every room of the museum (plus one located at the museum entrance) and provide information by **counting the number of visitors** who enter and leave and by detecting people’s movement inside the room and around the artworks. Such data, in addition to being displayed on the dashboard website, feeds our algorithms to generate unique graphical and musical effects on visitors’ smartphones according to the principles of edge computing. 

![People counting and motion](/img/people_counting_and_motion.png)

In the current particular historical period (**COVID-19** era), information about how many people are in a given area of the museum can obviously help to maintain **social distancing** and avoid crowding situations. By leveraging data collected by STM boards, implementing the people counting functionality, we offer the possibility for
- visitors to **real-time** consult, via a rooms list available in the **mobile web app**, the accessibility of the next rooms they want to visit and, so, decide to enter them later on if rooms are currently non-accessible or too crowded for them.
- museum’s managers to **real-time** consult, via a rooms list available in the **dashboard website**, how many people are in the rooms and, so, decide to alert the staff in case of crowded situations.

Moreover, this data is also used by STM boards to light up **LEDs** placed above each room entrance in different colors, in order to avoid entering an excessive number of people in already crowded areas. In this way, staff and visitors can immediately know if the room in front of them is accessible or not without using their smartphones.


<p align="center"><img src="/img/led.png"></p>

<p align="center"><img src="/img/chart_led.png"></p>

Using the dashboard, museum’s manager may have a complete view of what is happening inside the museum.  
Here there’s a non-exhaustive list of what they can do:
- to know what is the **favorite artwork** via data provided by the ARte web app
- to know what is the **most visited room** via data sent by boards
- to know what is the **favorite** form of **interaction** with artworks
- to know what is the **current number of visitors inside a room**
- to know what is the **current number of visitors inside the museum**
- to know what is the **percentage of use of the ARte web app** among people who visited the museum
- to know what is the **daily trend** of the museum in number of visitors
- ...

We remember you again that we care about **privacy**, so data are collected completely anonymously.

In the end, the dashboard also offers the possibility to museum’s managers to add, update and remove information about artworks, such as the position inside the museum, title, description or author. This will provide a good level of readjustment in case of museum rearranging.

If you want to know more about how our system works, we suggest you take a look at the [ARte Architecture](Architecture.md).

## Previous versions
[Version 1](https://github.com/ARte-team/ARte/blob/325640a8c1b247c1c019b6fa6bcdf795172146f2/Design.md) of the document.

[Version 2](https://github.com/ARte-team/ARte/blob/680a84dcb82bbda3c669698417057f9012c2db3b/Design.md) of the document.
