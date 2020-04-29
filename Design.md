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

![Interaction chart](/img/chart_interaction.png =650x)  


To fill this gap, we selected some features, among those proposed, for the smartphone app based on audience preferences.

![Features preferences chart](/img/chart_features_preferences.png)

![Features money chart](/img/chart_features_money.png =700x)  


## User Personas
The analysis of such data also allowed us to define three user personas (a fictional representation of three people belonging to three different groups of our audience):
- An employee
- A freelance
- A student

![Occupation chart](/img/chart_occupation.png =700x)

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
In addition to visitors, we have another type of user who doesn’t use the **ARte** web app and that we haven’t mentioned so far: the museum’s manager. Few people belong to this group and are interested to **analyze data** for statistical purposes in order to find useful information for the museum. To meet this demand, we developed a website in which the museum’s managers, once logged in, can access data via a simple **dashboard.**  
But what data? Never heard about **crowdsensing**? It is a technique where a large group of individuals having mobile devices capable of sensing and computing collectively share informations. Such data are sent completely **anonymously** by the visitors’ smartphones, after an explicit agreement of the user, and by several **ARM Cortex boards**. These are installed in each room of the museum and provide info by counting the number of visitors who entering and leaving. In this way museum’s manager may have a complete view on what happens inside the museum. Here there’s a not exhaustive list of what they can do:
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
