# 3rd delivery

## Comments received during the 2nd presentation and changes
During the 2nd presentation of the project, the comment we received was that the **IoT component** was not very clear, mainly for the core of the project based on the mobile web app and not on a microprocessor as requested. We were also pointed out to a low level of data processing because once acquired by the sensors of the STM boards, we only performed simple actions.

Upon reflection, this was partially true because so far, **ARte** was indeed mainly developed with the aim of providing a tool by which:

- the museum’s visitors could improve their **experiences**
- museum’s managers could collect useful **statistics**

as result of several discussions with our Design Advisor Andrea Nardone and inspired by numerous investments made by different museums in the world such as **The National Museum of Singapore**, **The Art Gallery of Ontario (Toronto)** and **The Smithsonian Institution**, **Washington D.C.** 

However, if on the one hand we had **interaction** and **entertainment**, on the other hand, we did not leave out the role of the **STM boards**. They, in addition to **counting people** inside the different areas of the museum in order to obtain statistics of interest for the museum’s managers about the most visited room in the museum, by providing **real-time data** about how many people are in a room, could help both staff and visitors to **maintain social distancing** and avoid crowded situations. This, crucial in the current particular historical period (**COVID-19** era), was achieved

- by displaying a **map** based on crowding in the **mobile web app** and in the **dashboard website** and
- by placing a **LED** above each room entrance

(take a look at the [2nd delivery document](2nd%20delivery.md) to know more).

Nevertheless, the overall **balance** of the mobile web app was shifted at first glance towards interaction and entertainment rather than IoT. To avoid this impression and reverse the overall balance, in this 3rd and final delivery, we decided to improve the IoT component of the project in order to be perceptible in the web app while preserving interaction and entertainment. How? We introduced **two new features** in the mobile web app which, producing evident **effects in the augmented reality mode**, make the use of data collected by STM boards more explicitly.

As a consequence of this, information gathered by STM boards implementing the people counting function was no longer sufficient because we needed sensors capable of obtaining **continuous and variable data** (inside the museum) suitable to be combined and, therefore, able to produce variable results after proper processing. The idea was to introduce multiple STM boards of a new type in every room, arranged in such a way that, by using a **PIR sensor**, they detect **people's motion** in that room. In this way, based on the **edge computing** principle, we joined together and then processed, in the smartphone web app, the values sent to the backend by people counting boards and corresponding motion detection boards of each room, in order to apply **dynamic and non-deterministic graphical effects** to the AR models and generate unique music.
So, we got a **mix between IoT, entertainment and interaction** because the produced effects in the mobile web app are a direct consequence of visitors behavior and change accordingly.

![People counting and motion](/img/people_counting_and_motion.png)

In light of this, we conducted a new **survey** to give a voice to potential users of the app again, in order to know if changes were appreciated. When we prepared it, we noticed that we did not dedicate a paragraph to **competitors** in the Design document, so, based on answers to a specific question and detailed research, we added some lines in the document.

In general, the survey’s results confirmed our impressions because the people who responded, sharing our point of view, liked the introduced features (Interactive Colored Filter, subsequently named **Dynamic Artwork Reimagination**, and **Interactive Music**). Moreover, based on the answers received, we decided to edit two user personas (Martina, a student, and Maurizio, an employee) and the associated **use case scenarios** to better focus attention on the new IoT features (check out the [Design document](Design.md) to know more). 

Talking about the **ARte architecture**, along with the added STM board for detecting people motion via PIR sensor, we restructured the **ARte database** by reducing the tables from four to three:

- The People relation was renamed **Room relation** and instead of continuously adding entries identified by the room ID and the datetime when data was collected, we decided to keep the table size constant and simply update the entries (identified by the room ID) with the new received data. We decided so because we considered that having a history of the room flow was not so useful for museum’s managers while performances were preferable when fetching data about museum’s rooms.
- The **Artworks relation** was joined with the Cumulative relation and the same philosophy of the Room relation was adopted. Indeed, we noticed that it was not useful and efficient to split the two tables because museum’s managers are more interested in data collected about artworks (e.g. knowing the most liked ones) than in knowing statistics about features usage alone. As a result, the Daily Relation for the web app usage was no longer useful because statistics about the features usage in history are not relevant to the museum.
- The **Daily relation** content was replaced with daily statistics about the visitors’ flow at the museum entrance (e.g to know the daily trend of the museum, the day with more visitors and so on).

To carry out the new data collection and the new IoT web app features, the **MQTT messages**, sent by the STM boards and the visitors’ smartphones, were therefore revised, adding the required missing information.

Lastly, in the **Dashboard Website**, we decided to remove the connection between it and the AWS message broker, because every time information about a room is retrieved, the total number of visitors who entered it is also displayed. Additionally, performances were not affected by such removal. (Take a look at the [Architecture document](Architecture.md) to know more). 

Regarding the **ARte evaluation**, we only improved the drafting of the document, adding all the results obtained by using indicated tools, conducted surveys and our own practice studies. (check out the [Evaluation document](Evaluation.md) to know more).

## Technical work done since the 2nd delivery
- **STM32 Nucleo board**: as we did not have the physical hardware (neither the X-NUCLEO-53L0A1 expansion board and the STEVAL-IDI009V1 evaluation board) and the museum is currently closed due to the COVID-19 situation, we had to simulate the IoT system with the native emulator of RIOT-OS.
  - **People counting board**: in the related program, we implemented the visitors’ flow taking into account possible museum attendance times and then computed the crowding situation of every room in order to properly illuminate each associated LED and then send this additional information to the MQTT-SN bridge. A board of this type was also added at the museum entrance to get a picture of the people’s flow during the day and the museum trend day by day.
  - **Motion detection board**: in the corresponding program, we implemented the detection of the people’s motion by generating a random value for the PIR sensor within a range received in input from the console, sending this additional information to the MQTT-SN bridge. In the end, we wrote the collection of MQTT-SN messages from a specific room at the bridge level, in order to send a single message to the backend at fixed time intervals and to align the detected values of the PIR sensors with the actual number of visitors inside the room.
- **Mobile web app**: on the website, we implemented the two new IoT features, whose results are a processing of data sent by the STM boards inside the room in which the visitor is activating the functionality, and the crowdsense map as a scrollable rooms list whose items report the accessibility of the rooms (in relation to the number of people inside them).
- **Dashboard**: on the website, we connected it with the backend, implemented new functionalities, finalized the artworks managing pages with the associated uploads and restyled the UI of some elements. Furthermore, we added server-side access control for protection from unauthorized requests by using AWS Cognito.
- **Server**: we implemented the AWS lambda functions, triggered by AWS message broker rules when a new message arrives on a specific topic, to store validated data into the ARte database.
- **Architecture**:  we completed the architecture by restyling the MQTT messages and the database tables as explained above. The removal of the *Cumulative relation* (no longer necessary) and the adopted philosophy resulted in reducing the size (and therefore in improving the performances) of the three remaining tables: *Daily relation*, *Rooms relation* and *Artworks relation* without loss of useful information for museum analytics.

## Evaluation conducted since the 2nd delivery
- **Accessibility** in order to allow every kind of user has to be able to interact with the application
- **Compliance with standards** for the written code
- **Cost** for hardware and software components
- **Latency** tests for evaluation of loading and elaboration times
- **Performance** for software execution and communication between components
- **Privacy** checks, confirming no sensitive data is stored and privacy policy is well proposed
- **Scalability** studies, verifying capacity of software resources and stress resistance of the infrastructure
- **UX** using surveys and evaluating users’ replies

![Final Evaluation](/img/technology_evaluation_4.png)

## List of the functionality that is still missing and which you aspect you did not manage to evaluate
- We decided not to implement two of the old proposed features (**animation** and **rebuilding of missing components**) at the moment because not really of interest for the course. We preferred to focus on the new IoT ones as explained above.

## Future developments
- **ML algorithm for music generation**: Interactive Music can be generated through a machine learning algorithm which can give a more cohesive and complete experience.
- **Artwork recognition improvement (ML algorithm)**: every artwork could be better recognized by running a machine learning algorithm feeded with a collection of pictures taken by web app users.
- **Web App Map improvements**: the current web app rooms list about crowding could be enhanced using the GPS motion sensor of the smartphone, in order to display the situations in the rooms close to the visitor. Furthermore, replacing the list with an interactive map of the museum could improve the UI.
- **Implementation of missing features**: based on surveys’ results, the missing features are likely to be implemented because they are appreciated by potential users.
