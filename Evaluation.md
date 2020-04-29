## Overview
In a kind of system as the one we want to create, **performances** need to be evaluated using different metrics, which are related to technical aspects, but also to user experience parameters. 
As explained in design and architecture sections, the users that will use ARte application are of two different types: visitors, which has to easily interact with the smartphone app, having an **intuitive** and attractive interface, and managers, which needs data displayed in a understandable way and a **feasible** method to update artworks informations. 
For sure another aspect that a final user will take into account will be **response time** performances, as no user will use the application if it isn’t enough **smooth** and no manager will allow to wait for a too large amount of time.
 
## User Experience
User experience is the second main aspect to be considered for the two web apps. It needs to be polish, understandable, responsive, but also interesting and accessible:

- **Usability**: nobody wants to wait to much for an animation to appear, for an action to be performed or a web page to be loaded. Also features needs to happen without bugs.
- **Simplicity**: app must be intuitive for both types of user. Understandable use of features and and easily identifiable position are again something that has to be considered.
- **GUI**: the eye wants its part, so polish interface and an inspired style are much appreciated by visitors and managers.
- **UX**: the service we propose has to improve the overall user experience, providing something that can’t be observed visiting a museum which doesn’t use this kind of system. 
- **Surveys and interviews**: AR web app has to propose features which can solicit people to use it. In this sense we conducted some interviews and and survey, aiming to find some liked interactions.
- **Accessibility**: all kind of users has to be able to interact with the applications, also the ones affected by disabilities.

## Technical
*QoS* (Quality of Service) is crucial for this system, this means we have different aspects that have to be analyzed from a technical point of view, such as:

- **Latency**: the product needs to be efficient, so the values computed by the sensors and the actions performed by users (also by museum’s managers) must be registered without delays. 
- **Scalability**: the whole system needs to remain performant with the increasing number of connected visitors, connected managers or registered works of art.
- **Maintenance**: that regards either the database services and the message exchange. In order to satisfy every single visitor, which must have the best possible experience, the system needs to keep track of what type of artwork the users use.

We have chosen Amazon AWS services, because they specific features and technical needs which coincide with our needs, in overspecified terms, in particular for the part of the MQTT message broker. 

## Tools and techniques for evaluation

Here we propose some tools or technique that can be used to evaluate the before mentioned metrics:

- [**Pagespeeds**](https://developers.google.com/speed/pagespeed/insights) by Google and [**Pingdom**](https://tools.pingdom.com/) are really great tools which can provide a complexive evaluation for webapp page loading and AR response times. They also offer informations about GUI and accessibility quality. The browser console can also be used for more details.
- **AWS services table** offers detailed informations about limits and available resources for each user. Observing it we can evaluate if it can be the right choice in terms of MQTT broker performances such as: message delivery times, multiple supported publishes and subscribes, etc…They are also useful in the evaluation of the database performances.
- **Users’ reactions and feedbacks** are another method, and probably the most effective one, to understand if all the aspects regarding user experience were satisfied. The main idea can also be improved with users’ proposals.
 


