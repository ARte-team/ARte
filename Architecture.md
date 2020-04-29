# Architecture

### Overview
The architecture of **ARte** is mainly based on the **MQTT** communication protocol. The main purpose is to collect data about most liked works of art and areas of the museum, through the visitors' use of a **web application** and several **ARM Cortex boards**. The first one runs on the user’s smartphones, collects data with the camera and the use of augmented reality according to the **crowdsensing** technique, and finally sends them to an MQTT cloud message broker. The boards, instead, use a specific sensor to detect people entering in a certain area of the museum and publish messages on the broker as well. The broker is linked to a **database**, which has the role of storing all the informations. This last component has a specific structure, in order to obtain the best performances: two main relations manage web app data, storing info about real-time daily utilization, a third one deals with people counting and the last one with artwork's informations.
The **website** extracts informations from the database, providing a detailed report, in the form of a readable dashboard website, to museum’s managers. The visitors' web app also displays real-time data about the number of users occupying specific areas of the museum, in order to allow people to avoid crowded areas.

![Architecture](/img/architecture.png)  

### Smartphone app
It is proposed in the form of a **web app**, available through a simple website. In this way visitors doesn’t need to install any OS-based app, since it’s required only an Internet connection and a browser. The app makes use of *Three.js* and *Three.ar.js* APIs for the virtual and augmented reality components, which allow users to **interact** with museum’s artworks and simultaneously providing background data. Then, using *Paho Javascript* APIs, informations are sent to the broker on a specific topic identified by a device ID via MQTT, a lightweight and widely adopted messaging protocol designed for constrained devices. The app pushes data in real-time using this unique random generated ID, so, informations are collected anonymously in order to guarantee **users’ privacy**. In the end, each action of the user corresponds to a specific score that will be translated into information data by a post cloud processing. The application also receives data from the broker about the most crowded areas of the museum in order to provide a useful info for the visitor.  

### STM32 Nucleo board
The board makes use of the **X-NUCLEO-53L0A1 expansion board** that features the VL53L0X ranging and gesture detection sensor (based on ST’s FlightSense™, Time-of-Flight technology) to detect when new people enter certain areas. It stores a local counter and sends real-time data for web app and dashboard consultings, but also provide less frequent updates to the databases, in order to have detailed statistics over time. Such data are published via MQTT on a topic identified by the room ID where the board is installed. We decided to implement this solution using the **RIOT-OS** operating system that supports most low-power IoT devices and microcontroller architectures. The software has been developed in *C* language.

### MQTT cloud message broker
The broker runs on an online server, using **Amazon AWS IoT services**. It makes use of the MQTT protocol which offers a lightweight message exchange. The broker role is to forward messages published by the visitors’ devices to the database (persistent layer), which then will be queried by the dashboard website. Users’ privacy is guaranteed by the random generation of the device ID which is both used as a topic of the broker and converted into a specific key by the Daily relation of the database. Messages are JSONs of the following form:  
{ &lt;deviceID&gt;, &lt;datetime&gt;, camera, &lt;feature&gt;, &lt;usageTime&gt; }  
{ &lt;roomID&gt;, &lt;datetime&gt;, board, &lt;count&gt; }  
respectively submitted by the smartphones and the boards on different topics.    

### Database
The database is implemented using **Amazon DynamoDB**, a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability, and contains four relations: two manage the data flow from users to museum’s managers, one for data collected by the boards and a last but not least to store information about artworks available in the museum. Here is a short description of how each database works:
* _Daily relation_: it stores instant users habits on the web app. Each time a new user enters the museum, it is registered in a “visitors vector” and then it begins pushing data about used features on this relation. Each received message by the broker is stored as:  
{ &lt;deviceID&gt;, &lt;datetime&gt;, &lt;feature&gt;, &lt;usageTime&gt; }  
where the *deviceID* and *datetime* attributes are the primary keys, *feature* is the used functionality and *usageTime* is the interval of time the visitor has used this feature.
* _Cumulative relation_: it is updated periodically, cumulating info from the daily relation, in order to clean it improving performances and give quick pre-computed information to the website. It is populated by a **lambda function**, which stores tuples in this format:  
{ &lt;artworkID&gt;, &lt;datetime&gt;, camera, &lt;featuresAnalysis&gt;, &lt;deviceIDs&gt; }  
where the *artworkID* and *datetime* attributes are the primary keys while *deviceIDs* is an array used to avoid double counting a visitor and *featuresAnalysis* is an array of JSON objects.  
These contain the following fields:  
{ &lt;feature&gt;, &lt;countUsage&gt;, &lt;countUsageTime&gt; }  
where *feature* is the name of the functionality, *countUsage* is the number of visitors which used it and *countUsageTime* is the collective amount of time of use.  
So, each entry corresponds to one update of the artwork on a daily basis, indeed the *datetime* is equivalent to the time of the update.  
The lambda function counts the number of visitors that use the different features in a day by using the *deviceID* field.
* _People relation_: this relation has the role to store information about the number of people which visited a certain area of the museum at a specific time. Information are periodically received from the broker and are in the following format:  
{ &lt;roomID&gt;, &lt;datetime&gt;, &lt;count&gt; }  
where the *roomID* and *datetime* attributes are the primary keys while *count* represents the number of people in the room at the specified date time.
* _Artworks relation_: it holds information about each work of art. It may be useful for the museum managers since the museum may change its layout periodically. In this way it is possible to modify the content of the table, adding or removing artworks. Its entries are as follows:
{ &lt;artworkID&gt;, &lt;datetime&gt;, &lt;description&gt;, &lt;roomID&gt; }  
where the *artworkID* attribute is the primary key, *datetime* references to the inserting or updating of the entry, *description* is self-explanatory and *roomID* is the room ID in which the artwork is located.  

### Website
Implemented using the main web programming languages as *HTML* and *Javascript*, it offers a *Bootstrap* realized frontend for museum’s managers. Selected and reworked informations are proposed in a simple and comprehensible **dashboard**, with the use of charts and diagrams. Its functionalities include the possibility to modify information about a specific work of art, to remove it and to add a new one. It also displays informations about the most visited areas both in real-time and querying the database.
