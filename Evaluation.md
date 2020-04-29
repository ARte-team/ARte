# Evaluation

## Overview
In a kind of system as the one we want to create, **performances** need to be evaluated using different metrics, which are related to technical aspects, but also to user experience parameters.
As explained in design and architecture sections, the users that will use ARte application are of two different types: visitors, which have to easily interact with the smartphone app, via an **intuitive** and attractive interface, and managers, which need data displayed in an understandable way and a **feasible** method to update artworks information.
For sure another aspect that a final user will take into account will be **response time** performances, as no user will use the application if it isn’t enough **smooth** and no manager will allow to wait for required data for a too large amount of time.

More in general, the **Key Performance Indicator** or **KPI**, provides a good understanding of the four main indicators a developer has to take care when projecting a new service:

- **General indicators**
- **Quality indicators**
- **Cost indicators**
- **Service indicators**


## User Experience
User experience is the first main aspect to be considered for the two web apps. It needs to be polish, understandable, responsive, but also interesting and accessible:

- **Usability**: nobody wants to wait too much for a 3D model or an animation to appear, for an action to be performed or a web page to be loaded. Moreover features need to be bug-free.
- **Simplicity**: app must be intuitive for both types of user. Understandable use of features and and easily identifiable position are again something that has to be considered.
- **GUI**: the eye wants its part, so polish interface and an inspired style are much appreciated by visitors and managers.
- **UX**: the service we propose has to improve the overall user experience, providing something that can’t be observed visiting a museum which doesn’t use this kind of system.
- **Accessibility**: all kind of users have to be able to interact with the applications, also the ones affected by disabilities.
- **Privacy**: users' personal information need to remain hidden. No kind of data about people has to be stored.
- **Surveys and interviews**: AR web app has to propose features which can solicit people to use it. In this sense we conducted some interviews and and survey, aiming to find some liked interactions. Interviews and surveys will support us in the entire development cycle in order to direct our work in the right direction.

![User experience evaluation](/img/user_experience_evaluation.png)

## Technical
*QoS* (Quality of Service) is crucial for this system, this means we have different aspects that have to be analyzed from a technical point of view, such as:

- **Latency**: the product needs to be efficient, so the values computed by the sensors and the actions performed by users (also by museum managers) must be registered without delays.
- **Scalability**: the whole system needs to remain performant with the increasing number of connected visitors, connected managers or registered works of art.
- **Performance**: it regards computational complexity, as code execution needs to be maintained fast. Algorithmic optimization is one of the keys for a good service.
- **Reliability**: the used networks protocols has to assure the communication went fine, notifying the delivery of data. This is a synonym for assurance.
- **Compliance with standards**: the code has to respect the main standards of good programming.
- **Cost**: the whole system doesn’t have to impact to much on museum’s expenses. The components have to be quite cheap and also cloud services has to be chosen looking at the best price/quality option.

We have chosen Amazon AWS services, because their specific features and technical aspects coincide with our needs, in overspecified terms, in particular for the part of the MQTT message broker.

![Technology evaluation](/img/technology_evaluation.png)

## Tools and techniques for evaluation
Here we propose some tools or technique that can be used to evaluate the before mentioned metrics:

- [**Pagespeeds**](https://developers.google.com/speed/pagespeed/insights) by Google and [**Pingdom**](https://tools.pingdom.com/) are really great tools which can provide a complexive evaluation for webapp page loading and AR response times. They also offer informations about GUI and accessibility quality. The browser console can also be used for more details.
- **AWS services table** offers detailed informations about limits and available resources for each user. Observing it we can evaluate if it can be the right choice in terms of MQTT broker performances such as: message delivery times, multiple supported publishes and subscribes, etc. All these informations will be described in the last section of this document. They are also useful in the evaluation of the database performances.
- **Users’ reactions and feedbacks** are another method, and probably the most effective one, to understand if all the aspects regarding user experience were satisfied. The main idea can also be improved with users’ proposals.
- [**W3C validator**](https://validator.w3.org/) plays an important role in evaluating if the webcode respects technical standards.
- [**Web accessibility**](https://webaccessibility.com/) website and [**a11y**](https://color.a11y.com/?wc3) color contrast analyzer are really good tools to quick evaluate accessibility, looking at readable fonts, optimal dimensions, color contrast, etc.

## AWS IoT Core Message Broker

| Resource | Description | Default | Adjustable |
| --- | --- | --- | --- |
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
