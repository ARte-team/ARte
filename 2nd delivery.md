# 2nd delivery

## Comments received and changes to project idea and documents
During the 1st presentation lecture of the project we received the following comments from our professors:

- It was not completely clear how we realized the presented one was a problem
- The role of the STM board was not made evident
- The STM board was not considered in the evaluation document

So, we addressed them trying to go deeper into these topics, also modifying design and evaluation files, in order to better explain and demonstrate our work.   First of all, it was extremely clear that we had to better present the **conception process**, in order to demonstrate that the solution we proposed addressed a specific and **real problem**. Probably, in the 1st presentation lecture, unlike from the video of the product/idea and the Design document, we didn’t focus so much on some questions and answers of the 1st survey we made. Indeed, in the 1st version of the Design document, we wrote a section called **Why ARte?** in which we justified our solution to the emerging problem of the ubiquitous interaction need of the user. Quoting an extract from it: *“The world is continuously evolving and the way to visit a museum it is no an exception. Simply watch artworks is no longer enough, visitors want to interact with them. An initial proof of this concept was given to us by preliminary interviews and then was confirmed by this question in our first survey.”*  
So, is the current (pre-Covid) fruition of a museum a problem for visitors? Probably yes, at least for the majority of the users which have replied to our survey.

![Chart interaction](/img/chart_interaction.png)

Analyzing the answers, although 91,2% of the users like to visit museums, 93,8% of them admit that they would like to have some different kinds of interactions with the artworks. Moreover, someone in the small percentage who doesn’t like visiting museums adds that he/she doesn’t like it because *“most of the time the visit is not involving enough”* or because a simple visit may be *“boring”*.  
Furthermore, when we asked **What do you expect to find inside the Sapienza's Arte Classica Museum? (in terms of artworks and services related to them)** some answers focused again on **interactivity**.  
In conclusion, the need is real and is also justified by numerous investments made by different museums in the world such as **The National Museum of Singapore, The Art Gallery of Ontario (Toronto)** and **The Smithsonian Institution, Washington D.C.** [link](https://www.museumnext.com/article/how-museums-are-using-augmented-reality/).  
So, quoting again the **Why ARte?** section *“To fill this gap, we selected some features, among those proposed, for the smartphone app based on audience preferences”.*

Moving on to the 2nd comment, we reworked the general idea of using the **STM board** to count people inside the different areas of the museum to get statistics about the most visited room in the museum and similar. We understood that in this particular historical period (with the **COVID** situation), a feature like this one can help to **maintain social distancing** and to avoid crowded situations, having the possibility to **real-time** consult how much people are in next rooms we want to visit and, therefore, enter them later on.  
This was initially performed via a **map** accessible in the web app, differently colored according to the real-time number of people in each room.  
To improve the use of the board, **also to make its role more evident if not**, we came up with the idea of placing a **LED** above each room entry, in order to avoid entering an excessive number of people in already crowded areas. In this way, users may avoid to use continuously their smartphones and immediately know if the room in which they want enter is full or not. Not only, staff could use it to easier maintain social distancing.

![Safety](/img/safety.png)

In the end, we reworked a bit the Evaluation document, trying to include considerations about the STM board, also adding a specific paragraph called *Hardware and software choice*, which presents the main thoughts under the selection of the specific components of the project, board included. With this choice we tried to address the 3rd comment we received.

## Technical work done since 1st delivery
- **Mockups**: in order to conduct a survey about user experience and, hence, have a solid basis on which start to create the web app, we decided to draw some mockups using [Balsamiq](https://balsamiq.com/). This operation led us to discard UI views we considered non-intuitive and then select only the ones we preferred.
- **Survey**: when mockups were ready, we proposed them to audience via questionnaire, to know if our work was appreciated. Results were satisfying since most of answers agreed with our decisions.
- **STM32 Nucleo board**: since we don’t have a physical board (neither the X-NUCLEO-53L0A1 expansion), we have to simulate the IoT system with the **native emulator of RIOT-OS**. Our goal is to control the people flow in each room of the museum, taking into account the possible situation of crowd that we should try to avoid (due to COVID emergency). However, in this moment we cannot limit the number of people that stay for a long time in the same room, but we can only check this number to understand if we have to sort people or not. Therefore the program simulates a **possible people flow in the museum**, assuming that there is a sensor for each room. In this way we can count the number of visitors that enter the rooms with a fixed probability. Each message sent by the program to the **MQTT bridge** shows the current number of visitors in that room and the total number of people that enter the room at least once.
- **AR web app**: we built a very first version of the AR web app with one implemented feature, the **storytelling**, which will need to be improved with users’ feedback for the final delivery. The feature can be activated through the corresponding button and an artificial voice will tell an anecdote about the recognized statue. The user experience is not completed, but it’s at a good point, having tried to understand visitors’ needs with a second survey. The management of smartphone’s idle times is completed, with data flowing to the **AWS IoT Message broker** without increasing loading times or decreasing performances. Communication with the broker was implemented using safe Cognito methods.
- **Dashboard**: museum managers can access data collected by boards and the AR web app via a browser dashboard. It consists of six sections organized into two submenus: **Analytics** (General, Artworks, Rooms, Features) and **Manage artworks** (Add and Edit). Why? Because we detected two main goals for a museum manager: knowing statistics about what’s happening and what’s happened inside the museum and handling artworks, so add/delete/update them in order to reflect the real situation inside the museum. On this basis, we thought about a possible UI, so we started creating mockups (simultaneously with the AR web app ones). When we came up with an intuitive and almost complete UI, we started to implement the basic elements of the dashboard interface and some logic without connecting it with the backend, except for the *Rooms* section.
- **Communication**: The three components communicates via MQTT on the topics indicated in the Architecture document, with the message structure already decided. Also some automatic insertion rules for the database have been set up.

![Technical work](/img/tech.png)

## Technical work missing for the 3rd delivery
- **STM32 Nucleo board**: crowd room situation must be implemented in order to illuminate each **LED** in the properly way and send this additional info to the cloud. Moreover, the code needs to be modified in order to run on **IoT-LAB**.
- **AR web app**: a selection on features needs to be done in the final version of the project, along with their implementation. The artwork detection mode and experience need to be improved. The crowdsense **map** needs also to be implemented, along with a proper elaboration of related incoming data.
- **Dashboard**: it mainly needs to be connected with the **backend** in order to retrieve data from the database and the message broker. UX must be enhanced and features analytics page must be implemented.
- **General architecture**: the AWS structure needs to be improved. **Lambda function** must be designed, in order to improve scalability and performances. To manage the crowd in the museum will be put a LED in each room that lights up when the number of visitors is too high.

## Evaluation since 1st delivery
- **UX, usability and GUI**: they were evaluated with a Google **survey** in which we asked opinions on the first mockups of the AR web app and on the general idea of the application.  
Results were extremely positive and confirmed our idea of implementing a web solution, instead of a native app one, which is not liked by people because don’t want to install an app in their smartphones for a museum visit. Satisfying opinions about our mockups, allow us to check if the proposed UI was intuitive and simple to use for users, so constituted a valid starting point from which we began to work. In the end, we note that sometimes there were still communicating issues in few questions that will need to be improved in the next and final survey.
- **Latency and performance**: tests performed with [Google PageSpeed](https://developers.google.com/speed/pagespeed/insights/?hl=IT) and [Pingdom](https://tools.pingdom.com/). The used tools returned similar results, based on different parameters like speed index, inactivity time, first contents displaying time, etc... for the two web pages:
  - **AR web app**: the score was a bit disappointing, so we understand that we’ll need to improve the code design in the future. Probably optimizing external libraries and general resources loading times. A general idea can be to prioritize content loading on the basis of most immediate needed resources.
  - **Dashboard**: here the score obtained was already a good one, having about **80/100 evaluation** on *Google PageSpeed* for the desktop version and 78/100 on *Pingdom*.  
  The first tool suggested us to work on the **loading times** of the first visible contents, the second one, instead, remarked the urge to add expires headers and make fewer HTTP requests. We’ll have in any case to enhance it with minimal interventions.  
  Moreover, we decided **edge computing** is the best choice to calculate the crowdedness of a room because avoids an useless further exchange of messages required by cloud computing to properly illuminate each LED.
- **Cost**: brief analysis for the STM boards, sensors and AWS services, searching the specific hardware on **online sellers** and trying to understand if such an expense could be afforded by the museum. We also tried to compare the chosen service with its competitors, verifying if it was effectively the best solution.
- **Scalability**: brief study for the whole **architecture**, analyzing the AWS services feature tables and trying to design the better solution, especially for the database structure and the communication part. Almost all the architecture related to the cloud service was designed in order to don’t lose performances with the increasing number of connected devices or data flowing.

![Current Evaluation](/img/technology_evaluation_2.png)

## Evaluation expected till the 3rd delivery
- **Correctness** and bug tests evaluations for all the developed softwares
- **Accessibility** and **simplicity** evaluations for both the AR web app and the dashboard via surveys and interviews
- **Privacy** issues evaluations if we miss something in our initial analysis
- **Reliability** tests for communication
- **Performance** tests and design choice (e.g. storytelling, precomputation vs text to speech)
- **Compliance** with standards for the final code

![Future Evaluation](/img/technology_evaluation_3.png)
