# Evaluation

## Overview
In a kind of system like the ARte one, **performances** need to be evaluated using different metrics, which are related to **technical aspects**, but also to **user experience** parameters. As explained in [Design](Design.md) and [Architecture](Architecture.md) documents, ARte addresses two different types of users:

- **museum visitors** (who want to interact with artworks by using the smartphone web app) need a simple, **intuitive** and **attractive interface**
- **museum managers** (who wish to get museum statistics using the dashboard website) need data displayed in a clear and easily understandable way, as well as a feasible method to update artworks’ information to respond to museum layout changes

Another relevant aspect that we had to take into account is **response time** performances, since no user will use an application if it isn’t sufficiently smooth and no manager will accept to wait for requested data for too long a period of time.

In order to achieve these results we also had to take into account the **hardware components** and verify the **correctness** of their implementations.

More in general, the **Key Performance Indicator (KPI)**, provides a good understanding of the four main indicators a developer has to pay attention to when designing a new service:

- **General indicators**
- **Quality indicators**
- **Cost indicators**
- **Service indicators**

## User Experience
User experience is the first major aspect we considered for the ARte project and it concerns the way a user interacts and experiences our service, including the person's perceptions of **utility**, **ease of use**, and **efficiency**.

Taking into account that UX is subjective, our aim is the service we offer must improve the overall user experience by **providing something unique to the museum’s visitor** that cannot be observed by visiting it without the ARte web app and by **providing useful information** to the museum's managers in order to better organize the layout of the museum itself and/or of the guided tours through the dashboard website.

Extracting three main questions results from the last survey, we can say that the goal was fully achieved, confirming the goodness of our work:

<p align="center"><img src="/img/Charts/Survey%203/app_visit2.svg"></p>

<p align="center"><img src="/img/Charts/Survey%203/app_experience.svg"></p>

<p align="center"><img src="/img/Charts/Survey%203/app_scoring.svg"></p>

Furthermore, during the development of the project we also considered the following aspects as **UX evaluation metrics**:


- **Accessibility**: every type of user must be able to interact with the application, even those with disabilities.
- **GUI**: the eye wants its part, so a clear, understandable and responsive user interface but also captivating with an inspired style compliant with material design guidelines are highly appreciated by users.
- **Privacy**: users' personal information must remain hidden, so it must be properly protected. To have it at the highest level and given the functionalities of the app, no type of sensitive data has to be stored unless necessary or publicly disclosed.
- **Simplicity**: the app must be intuitive for any user. Understandable use of features and easily identifiable position on the screen are once again something that has to be taken into account.
- **Usability**: nobody wants to wait too much for a 3D model to appear, for an action to be performed or for a web page to load. Moreover features must be bug-free as much as possible.

Therefore, we designed and implemented the ARte architecture and software components always keeping these key aspects in mind.

To evaluate the **GUI**, **Simplicity** and **Usability** we relied on two **surveys** we conducted in which we showed a short demo of the web app, based initially on mockups and then on the actual implementation. The following questions about the mobile web app confirmed the fact that is intuitive and easy to use and that the GUI is appreciated by visitors.

<p align="center"><img src="/img/Charts/Survey%203/app_simplicity.svg"></p>

<p align="center"><img src="/img/Charts/Survey%203/app_icons.svg"></p>

Talking about **Accessibility**, we evaluated it both for the web app and the dashboard once we completed their implementation through the tools indicated in the last section of this document, in particular **Web accessibility** website and **a11y** color contrast analyzer. Both the services stated that all the rules about accessibility were observed.

<p align="center"><img src="/img/web_accessibility.png"></p>

Talking about **Privacy**, we carried out an **evaluation by design** indeed ARte does not store any sensitive data about users, but only features’ related data. In addition, this one is also collected anonymously by generating a unique device ID for each visitor device using the mobile web app and of course by nature by STM boards, so that museum managers, but also programmers, cannot obtain any personal information about who’s using the software. In detail, the mobile web app also explicitly declares that **ARte privacy policy** and terms and conditions are accepted by the user who starts to use the app. If you are interested in reading them, you can find references on the [intro page](https://arte-team.github.io/ARte/ar-web-app/index.html) of the mobile web app.

![User experience evaluation](/img/user_experience_evaluation.png)

### Summary
| Aspect | Evaluation tools | Result |
| :---: | :---: | :---: |
| **Accessibility** | Web accessibility and a11y | **Success** |
| **GUI** | Surveys | **Success** |
| **Privacy** | Surveys | **Success** |
| **Simplicity** | Surveys | **Success** |
| **Usability** | Surveys | **Success** |
| **UX** | Surveys and metrics | **Success** |

## Technical
**Quality of Service (QoS)** is crucial for the ARte system, this means we have different aspects that had to be analyzed from a technical point of view, such as:

- **Compliance with standards**: the code must adhere to the main standards of good programming guidelines (**safety**, **security**, **reliability**, **testability**, **maintainability** and **portability**). To accomplish these, we constantly developed code according to **modular programming** software design technique to ensure maintainability and portability and tested it in order to avoid harmful behavior. Moreover, we evaluated the code of the websites by using the **W3C online tool** for HTML correctness and it did not return any error on the main pages of the AR web app and Dashboard. Thus, the code is perfectly compliant with W3C standards. To security, we dedicated a separated section a few lines below.
- **Cost**: the whole system must not affect the expenses of the museum too much. The hardware components, which in our case are the STM boards and their sensors, have to be quite cheap as well as the cloud services have to be chosen looking at the best price/quality ratio. So, we conducted some **market research** for all hardware and software components and about the former: the STM32 Nucleo Board can be purchased for about 14,00 €, the STEVAL-IDI009V1 evaluation board for about 32,00 € and the X-NUCLEO-53L0A1 expansion board for about 39,00 €. Cloud services costs instead are zero because the AWS Educate service is free for students and educators. Concerning hardware prices, we reported the prices for a single piece of each component, but probably for multiple components the expense could be lower. Nevertheless, this is clearly an affordable cost for a museum.
- **Latency**: the service needs to be efficient, so the values computed by the sensors of the boards and the actions performed by users (also by museum managers) must be carried out without or within minimum tolerant delays. Latency was evaluated together with Performance using the **Pingdom** online tool.
- **Performance**: it concerns computational complexity, as code execution needs to be fast. **Algorithmic optimization** and **efficiency** are the keys to a good service. This is a crucial point on a microprocessor like the one we want to use, as its hardware is not among the best performing. Performance was evaluated using the **Pingdom** online tool. It provides an overall score for the load times of all elements of the page, based on various criteria. It returned a score of 80 out of 100 for the web app, which is a pretty good score for a software which has to load several heavy components like 3D models, images and storytelling audios.
- **Scalability**: the whole system needs to remain performant with the increasing number of connected visitors, connected museum’s managers or stored information. A new STM board, for example, must be able to be added to the museum without having the need to rework the entire infrastructure. To evaluate it, we read the **documentation** of the chosen cloud service and AWS services proved to be really powerful in terms of scalability. DynamoDB has a throughput of up to 40,000 read request units and 40,000 write request units. AWS Lambda can process up to 1,000 concurrent executions and AWS MQTT Broker up to 500,000 concurrent connections.
In the end, AWS Cognito can scale millions of users.
- **Security**: the system must be robust against vulnerabilities in order to be resistant to cyberattacks of any kind. In order to accomplish this, secure communication protocols, correct server-side passwords and keys handling must be adopted, especially in an IoT service like this. AWS IoT Core connections use **RSA keys** and certificates. These plus **HTTPS everywhere** grant **CIA requirements** for data in transit between AR web app \ dashboard and the server, in order not to expose any data. **Server-side access control** is implemented to deny attackers to perform functionalities or access resources for which they are not entitled via Cognito authentication and IAM roles. Furthermore, **server-side input validation**, via triggered lambda functions, ensures protection against Injection and XSS attacks. In the end, the absence of using vulnerable libraries (as far as we know), AWS CloudWatch **logging and monitoring** and dashboard website **defense-in-depth** for most critical actions add another important security block. We assessed that a really good level of security is applied to the entire infrastructure.

![Technology evaluation](/img/technology_evaluation_4.png)

### Summary

| Aspect | Evaluation tools | Result |
| :---: | :---: | :---: |
| **Compliance with standards** | Web accessibility and a11y | **Success** |
| **Cost** | Market research | **Success** |
| **Latency** | Pingdom | **Success** |
| **Performance** | Pingdom | **Success** |
| **Scalability** | Cloud Service documentation | **Success** |
| **Security** | Design and code skills and SSLlabs | **Success** |

## Hardware and software choice
The **ARte** project is composed of different hardware components and software services. The previously mentioned metrics were crucial in the choice of the different parts we used to assemble the puzzle:
- **STM32 Nucleo board**: This board was the first option we considered as it is equipped with the requested Cortex processor and it can implement, through the X-NUCLEO-53L0A1 expansion board, the **people counting feature** and, through the STEVAL-IDI009V1 evaluation board, the **people motion detection feature**. Technical evaluations of their functioning will be carried out with empirical tests: counting people in the room in a real situation and comparing the number with the one obtained by the software and measuring the real distance of people from the sensors in the room and comparing it with data provided by sensors.
- **Amazon Web Services (AWS)**: web services that provide a variety of cloud computing platforms and APIs, compute power, database storage, content delivery services to build sophisticated applications with increased flexibility, scalability and reliability. We have chosen Amazon AWS services, because their specific features and technical aspects coincide with our needs, in aforementioned metrics, in particular for the part of the MQTT message broker. One of the main features we considered when we analyzed the different cloud services on the market, was the cost. Amazon was the one which provided the best performances with the higher saving. Every service we adopted has also some favorable characteristics:
    - **Amazon Cognito**: a service that lets us add user sign-in and access control to our websites quickly and easily. The provided SDK helps us with security problems, avoiding exposure of Amazon AWS access keys.
    - **Amazon DynamoDB**: a key-value and document database that delivers single-digit millisecond performance at any scale. It's a fully managed, multi-region, multi-active, durable database with built-in security, backup and restore, and in-memory caching for internet-scale applications.
    - **AWS IoT core**: a service that lets us connect IoT devices to the AWS cloud without the need to provision or manage servers. It can support billions of devices and trillions of messages, and can process and route those messages to AWS endpoints and to other devices reliably and securely. It offers a really good MQTT broker and also a good level of security. It allows us to define automatic rules for received message events to trigger our lambda functions. The complete table of the broker features is proposed at the end of the document.
    - **AWS Lambda**: a serverless compute service that lets us run code without provisioning or managing servers, creating workload-aware cluster scaling logic, maintaining event integrations, or managing runtimes. We uploaded our code for two functions triggered by two different message events: MQTT messages sent by the MQTT-SN bridge (which collects STM boards data) and MQTT messages sent by visitors’ smartphone. Their role is to validate incoming data and store it in the appropriate table of the ARte DB.
- **AR.js APIs**: a lightweight library for Augmented Reality on the Web. After analyzing several augmented reality libraries, we chose this one, because it offers a really simple implementation method and is probably the least experimental one, having really good compatibility with all the browsers.

## Tools and techniques for evaluation
Here are a list of some tools or techniques that we used to evaluate the aforementioned metrics:

- **AWS services documentation**: offers detailed information about limits and available resources to each user. Reading it we can evaluate if it can be the right choice in terms of MQTT broker performances such as message delivery times, multiple supported publishings and subscriptions, etc. This information is contained in the last section of this document. Documentation is also useful in evaluating the database performances and other services we adopted.
- **Browser console**: can be used to know more details about page loading.
- **[Pingdom](https://tools.pingdom.com/)** is a really great tool that can provide a comprehensive evaluation for web app page loading and AR response times. It also offers information about GUI and accessibility quality.
- **Surveys and interviews**: AR web app has to offer features that can solicit people to use it. In this sense we conducted some interviews and surveys, which are probably the most effective method as addresses ARte potential users, with the aim of finding a proof of concept to the problem and solution we propose, to understand if all aspects concerning the UX were satisfied and to learn favorite artworks interactions. Users’ reactions and feedback supported us throughout the development cycle, in order to steer our work in the right direction. All links to survey results are available on the README.
- **[W3C validator](https://validator.w3.org/)** plays an important role in evaluating if the webcode respects technical standards.
- **[Web accessibility](https://webaccessibility.com/)** website and **[a11y](https://color.a11y.com/?wc3)** color contrast analyzer are really good tools to quick evaluate accessibility, looking at readable fonts, optimal dimensions, color contrast, etc.

## AWS IoT Core Message Broker

| Resource | Description | Default | Adjustable |
| :---: | :---: | :---: | :---: |
| Connect requests per second per account | AWS IoT Core restricts an account to a maximum number of MQTT CONNECT requests per second. | 500 | Yes |
| Connect requests per second per client ID | AWS IoT Core restricts MQTT CONNECT requests from the same accountId and clientId to 1 MQTT CONNECT operation per second. | 1 | No |
| Inbound publish requests per second per account | Inbound publish requests count for all the messages that AWS IoT Core processes before routing the messages to the subscribed clients or the rules engine. For example, a single message published on $aws/things/device/shadow/update topic can result in publishing 3 additional messages to $aws/things/device/shadow/update/accepted, $aws/things/device/shadow/update/documents, and $aws/things/device/shadow/delta topics. In this case, AWS IoT Core counts those as 4 inbound publish requests. However, a single message to an unreserved topic like a/b is counted as a single inbound publish request. | 20,000 | Yes |
| Maximum concurrent client connections per account | The maximum number of concurrent connections allowed per account. | 500,000 | Yes |
| Maximum inbound unacknowledged QoS 1 publish requests | AWS IoT Core restricts the number of unacknowledged inbound publish requests per client. When this quota is reached, no new publish requests are accepted from this client until a PUBACK message is returned by the server. | 100 | No |
| Maximum outbound unacknowledged QoS 1publish requests | AWS IoT Core restricts the number of unacknowledged outbound publish requests per client. When this quota is reached, no new publish requests are sent to the client until the client acknowledges the publish requests. | 100 | No |
| Maximum retry interval for delivering QoS 1 messages | AWS IoT Core retries delivery of unacknowledged quality of service 1 (QoS 1) publish requests to a client for up to one hour. If AWS IoT Core does not receive a PUBACK message from the client after one hour, it drops the publish requests. | 1 hour | No |
| Outbound publish requests per second per account | Outbound publish requests count for every message that resulted in matching a client's subscription or matching a rules engine subscription. For example, 2 clients are subscribed to topic filter a/b and a rule is subscribed to topic filter a/#. An inbound publish request on topic a/b results in a total of 3 outbound publish requests. | 20,000 | Yes |
| Persistent session expiry period | The duration for which the message broker stores an MQTT persistent session. The expiry period begins when the message broker detects the session has become disconnected. After the expiry period has elapsed, the message broker terminates the session and discards any associated queued messages. | 1 hour | Yes |
| Publish requests per second per connection | AWS IoT Core restricts each client connection to a maximum number of inbound and outbound publish requests per second. Publish requests that exceed that quota are discarded. | 100 | No |
| Subscriptions per account | AWS IoT Core restricts an account to a maximum number of subscriptions across all active connections. | 500,000 | Yes |
| Subscriptions per connection | AWS IoT Core supports 50 subscriptions per connection. AWS IoT Core might reject subscription requests on the same connection in excess of this amount and the connection is closed. Clients should validate the SUBACK message to ensure that their subscription requests have been successfully processed. | 50 | No |
| Subscriptions per second per account | AWS IoT Core restricts an account to a maximum number of subscriptions per second. For example, if there are 2 MQTT SUBSCRIBE requests sent within a second, each with 3 subscriptions (topic filters), AWS IoT Core counts those as 6 subscriptions. | 500 | Yes |
| Throughput per second per connection | Data received or sent over a client connection is processed at a maximum throughput rate. Data that exceeds the maximum throughput is delayed in processing. | 512 KiB | No |

## Previous versions
[Version 1](https://github.com/ARte-team/ARte/blob/325640a8c1b247c1c019b6fa6bcdf795172146f2/Evaluation.md) of the document.  
[Version 2](https://github.com/ARte-team/ARte/blob/680a84dcb82bbda3c669698417057f9012c2db3b/Evaluation.md) of the document.
