# Design

## Overview
**ARte** (Augmented Reality to educate) is a smartphone **application**, available as a web service, for the *Sapienza University of Rome*'s [Arte Classica Museum](https://web.uniroma1.it/polomuseale/museo-arte-classica) which aims to improve the **interaction** between users and **artworks**.  
Visitors will be able to perform various actions on their device in order to toggle features based on the **Augmented Reality** technology. This makes use of the smartphone's **camera** and each framed artwork will appear as a **3D model** in the scene.  
The available functionalities, that can be interconnected in order to offer a better user experience, are the following:
- **Animation**: the artwork model is no more static but it will be animated
- **Contextualization**: the look of the room will be changed according to the artwork in order to reproduce its historical environment
- **Rebuilding of missing components**: the missing parts of the artwork will be rebuilt to recover its original appearance
- **Storytelling**: the artwork will tell a story or a fact about itself  


## Why ARte?
The world is continuously evolving and the way to visit a museum it is no an exception. Simply watch artworks is no longer enough, visitors want to interact with them. An initial proof of this concept was given to us by preliminary interviews and then was confirmed by this question in our first survey.

![Interaction chart](/img/chart_interaction.png)  

Analyzing the answers, 91,2% of the users like to visit museum, but also the 93,8% of them admits that they would like to have some different kinds of interactions with the artworks. Moreover, someone in the small percentage who doesn’t like visit museum adds that he/she doesn’t like it because *“most of time the visit is not involving enough”* or because a simple visit may be *“boring”*. Furthermore, when we asked what they expect to find inside the *Sapienza's Arte Classica Museum? (in terms of artworks and services related to them)*, some answers focused again on **interactivity**.  

Again, the majority of users would use an app to enhance their visit inside a museum

![Improve experience chart](/img/chart_improve_experience.png)

and half of all users would be tempted to go to a museum only knowing that they can interact with artworks

![App temptation chart](/img/chart_app_temptation.png)

In conclusion the need is real and is also justified by several investments done by some museums in the worlds like *The National Museum of Singapore*, *The Art Gallery of Ontario (Toronto)* and *The Smithsonian Institution (Washington D.C.)*.

To fill this gap, we selected some features, among those proposed, for the smartphone app based on audience preferences.

![Features preferences chart](/img/chart_features_preferences.png)

![Features money chart](/img/chart_features_money.png)  


## User Personas
The analysis of such data also allowed us to define three user personas (a fictional representation of three people belonging to three different groups of our audience):
- An employee
- A freelance
- A student

![Occupation chart](/img/chart_occupation.png)

![Employee](/img/user_employee.png)

![Freelance](/img/user_freelance.png)

![Student](/img/user_student.png)

What resulted was that each group generally prefers a different feature, respectively the contextualization, the storytelling and the animation one. In this way we individuated the needs of our users and we could focus on required functionalities.  


## User case scenarios
To give you a better idea of our product, here you can find a storyboard for each persona which represents a possibly user case scenario.

#### Storyboard of an employee: (Contextualization)
![Employee storyboard](/img/storyboard_contextualization.png)

#### Storyboard of a freelance: (Storytelling)
![Freelance storyboard](/img/storyboard_storytelling.png)

#### Storyboard of a student: (Animation)
![Student storyboard](/img/storyboard_animation.png)  


## Museum’s managers
In addition to visitors, we have another type of user who doesn’t use the **ARte** web app and that we haven’t mentioned so far: the museum’s manager. Few people belong to this group and are interested to **analyze data** for statistical purposes in order to find useful information for the museum. To meet this demand, we developed a website in which the museum’s managers, once logged in, can access data via a simple **dashboard**.  
But what data? Never heard about **crowdsensing**? It is a technique where a large group of individuals having mobile devices capable of sensing and computing collectively share informations. Such data are sent completely **anonymously** by the visitors’ smartphones, after an explicit agreement of the user.  
Smartphones are not the only devices which collect data because several **STM32 Nucleo boards** are installed in each room of the museum and provide info by **counting the number of visitors** who entering and leaving.

![People counting](/img/people_counting.png)  

In the current particular historical period (COVID-19), this information can help maintaining **social distancing** and avoiding crowded situations, having the possibility for an user to **real-time** consult, via a map accessible in the web app, how much people are in next rooms we want to visit and, so, enter them later on. Moreover, this data are both displayed in the dashboard and placing a **LED** above each room entry, in order to avoid entering an excessive number of people in already crowded areas. In this way, the staff and users may can immediately know if the room in front of them is full or not.

![Room situation](/img/led.png)  

![Led chart](/img/chart_led.png)  

In this way museum’s manager may have a complete view on what happens inside the museum.  
Here there’s a not exhaustive list of what they can do:
- to know what is the **favorite artwork** via data provided by the ARte web app
- to know what is the **most visited room** via data sent by boards
- to know what is the **favorite** form of **interaction** with artworks
- to know what is the **current number of visitors inside a room**
- to know what is the **current number of visitors inside the museum**
- to know what is the **percentage of use of the ARte web app** among people currently inside the museum
- ...

We remember you again that we care about **privacy**, so data are collected completely anonymously.

In the end, the museum’s managers will also be allowed to update and edit informations about artworks, such as the position inside the museum, title, description or author via the dashboard. This will provide a good level of readjustment in case of museum rearranging.

If you want to know more about how our system works, we suggest you take a look at the [ARte Architecture](Architecture.md).

## Previous versions
[Version 1](https://github.com/ARte-team/ARte/blob/325640a8c1b247c1c019b6fa6bcdf795172146f2/Design.md) of the document.
