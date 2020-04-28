# Architecture

### Overview
The architecture of **ARte** is mainly based on the **MQTT** communication protocol. The main purpose is to collect data about most liked works of art and areas of the museum, through the visitors' use of a **web application** and several **ARM Cortex boards**. The first one runs on the user’s smartphones, collects data with the camera and the use of augmented reality according to the **crowdsensing** technique, and finally sends them to an MQTT cloud message broker. The boards, instead, use a specific sensor to detect people entering in a certain area of the museum and publish messages on the broker as well. The broker is linked to a **database**, which has the role of storing all the informations. This last component has a specific structure, in order to obtain the best performances: two main relations manage web app data, storing info about real-time daily utilization, a third one deals with people counting and the last one with artwork's informations.
The **website** extracts informations from the database, providing a detailed report, in the form of a readable dashboard website, to museum’s managers. The visitors' web app also displays real-time data about the number of users occupying specific areas of the museum, in order to allow people to avoid crowded areas.

![Architecture](/img/architecture.png)  

### Smartphone app
It is proposed in the form of a **web app**, available through a simple website. In this way visitors doesn’t need to install any OS-based app, since it’s required only an Internet connection and a browser. The app makes use of *Three.js* and *Three.ar.js* APIs for the virtual and augmented reality components, which allow users to **interact** with museum’s artworks and simultaneously providing background data. Then, using *Paho Javascript* APIs, informations are sent to the broker on a specific topic identified by a device ID via MQTT, a lightweight and widely adopted messaging protocol designed for constrained devices. The app pushes data in real-time using this unique random generated ID, so, informations are collected anonymously in order to guarantee **users’ privacy**. In the end, each action of the user corresponds to a specific score that will be translated into information data by a post cloud processing. The application also receives data from the broker about the most crowded areas of the museum in order to provide a useful info for the visitor.  

### ARM Cortex board
The board makes use of a specific sensor to detect when new people enter certain areas. It stores a local counter and sends real-time data for web app and dashboard consultings, but also provide less frequent updates to the databases, in order to have detailed statistics over time. The software is written in C and implemented using the **RIOT-OS** operating system.

### MQTT cloud message broker
The broker runs on an online server, using **Amazon AWS IoT services**. It makes use of the MQTT protocol which offers a lightweight message exchange. The broker role is to forward messages published by the visitors’ devices to the database (persistent layer), which then will be queried by the dashboard website. Users’ privacy is guaranteed by the random generation of the device ID which is both used as a topic of the broker and converted into a specific key by the Daily relation of the database. Messages are JSONs of the following form:
{ &lt;deviceID&gt;, &lt;datetime&gt;, camera, &lt;feature&gt;, &lt;usageTime&gt; }  
{ &lt;roomID&gt;, &lt;datetime&gt;, board, &lt;count&gt; }  
respectively submitted by the smartphones and the boards.    

### Database
The database is implemented using Amazon DynamoDB and contains three relations: two managing the data flow from users to museum’s managers, the third one is used to store informations about artworks available in the museum. Here is a short description of how each database works:
* _Daily relation_: it has a variable size and stores instant users habits on the web app. Each time a new user enters the museum, it is registered in a “visitors vector” and then it begins pushing data about used features, on this relation. Each received message by the broker is stored as:  
{ &lt;deviceID&gt;, &lt;datetime&gt;, camera, &lt;feature&gt;, &lt;usageTime&gt; }  
where the deviceID and datetime attributes are the primary keys.
* _Cumulative relation_: it is updated periodically, cumulating infos from the daily relation, in order to empty it, improve performances and give quick pre-computed informations to the website. It is populated by a lambda function, which stores tuples with this format: { &lt;artworkID&gt;, &lt;datetime&gt;, camera, countFeatures, countUsageFeatures, deviceIDs }, where the artworkID and datetime attributes are the primary keys while countFeatures, countUsageFeatures, deviceIDs ones are JSON arrays. Each entry corresponds to one artwork in which we count the number of visitors that use different features.
* _People relation_: this relation has the role to store inormations about the number of people which visited a certain area of the museum at a specific time. Informations are received periodically from the broker and are consultable from the dashboard.
* _Artworks relation_: Holds information about each work of art. It may be useful for the museum manager since that the museum may change its layout periodically, and in this way is possible to modify the content of the table, adding or removing artworks.  

### Website
Realized using the main web programming languages as HTML and Javascript, it offers a Bootstrap realized frontend for museum’s managers. Selected and reworked informations are proposed in a simple and comprehensible dashboard, with the use of charts and diagrams. Its functionalities include the possibility to modify information about a specific work of art, to remove it and to add a new one. It also receives infromations about most visited areas both in real time and from database.
