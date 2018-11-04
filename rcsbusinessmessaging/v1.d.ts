/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { GoogleApis } from '../..';
import { MethodOptions, GlobalOptions, BodyResponseCallback } from '../../lib/api';
import { AxiosPromise } from 'axios';
export declare namespace rcsbusinessmessaging_v1 {
    /**
     * RCS Business Messaging API
     *
     *
     *
     * @example
     * const google = require('googleapis');
     * const rcsbusinessmessaging = google.rcsbusinessmessaging('v1');
     *
     * @namespace rcsbusinessmessaging
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Rcsbusinessmessaging
     */
    class Rcsbusinessmessaging {
        _options: GlobalOptions;
        google: GoogleApis;
        root: this;
        files: Resource$Files;
        phones: Resource$Phones;
        constructor(options: GlobalOptions, google: GoogleApis);
        getRoot(): this;
    }
    /**
      * The content of a message sent from the agent to a user.
      */
    interface Schema$AgentContentMessage {
        /**
       * Information about a file, including the URL of the file and the URL of the file’s thumbnail.  The RBM platform serves content from a cache, but an agent can force the RBM platform to fetch a new version of the content and refresh the cache.
       */
        contentInfo: Schema$ContentInfo;
        /**
     * The unique name of a file. The RBM platform returns a file name when an agent uploads a file.
     */
        fileName: string;
        /**
     * A standalone rich card.
     */
        richCard: Schema$RichCard;
        /**
     * A list of suggestions comprised of suggested replies and suggested actions. These suggestions are presented as a list of suggestion chips following the associated agent message. The chips only display when the associated agent message is the most recent message within the conversation (including both agent and user messages). The user can tap a suggested reply to send the text reply back to the agent, or she can tap a suggested action to initiate a native action on the device.
     */
        suggestions: Schema$Suggestion[];
        /**
     * Text encoded in UTF-8.
     */
        text: string;
    }
    /**
      * An event from the agent to the user.
      */
    interface Schema$AgentEvent {
        /**
       * The type of the agent event.
       */
        eventType: string;
        /**
     * The ID of the user message that the agent event pertains to. This field is only applicable for agent events of type READ.
     */
        messageId: string;
        /**
     * This field is set by the RBM platform. Do not include it when creating an agent event. The field resolves &quot;phones/{E.164}/agentEvents/{eventId}&quot;, where {E.164} is the user&#39;s phone number in E.164 format and {eventId} is the agent-assigned ID of the agent event.
     */
        name: string;
        /**
     * This field is set by the RBM platform. Do not include it when creating an agent message. The field resolves the time when the event is sent to the user.
     */
        sendTime: string;
    }
    /**
      * A message sent from the agent to a user.
      */
    interface Schema$AgentMessage {
        /**
       * The content of the agent message.
       */
        contentMessage: Schema$AgentContentMessage;
        /**
     * This field is set by the RBM platform. Do not include it when creating an agent message. The field resolves &quot;phones/{E.164}/agentMessages/{messageId}&quot;, where {E.164} is the user&#39;s phone number in E.164 format and {messageId} is the agent-assigned ID of the agent message.
     */
        name: string;
        /**
     * This field is set by the RBM platform. Do not include it when creating an agent message. The field resolves the time when the message is sent to the user.
     */
        sendTime: string;
    }
    /**
      * Card content
      */
    interface Schema$CardContent {
        /**
       * (Optional) Description of the card (2000 character maximum).
       */
        description: string;
        /**
     * (Optional) Media (image, GIF, video) to include in the card.
     */
        media: Schema$Media;
        /**
     * (Optional) List of suggestions to include in the card.
     */
        suggestions: Schema$Suggestion[];
        /**
     * (Optional) Title of the card (200 character maximum).
     */
        title: string;
    }
    /**
      * Carousel of cards.
      */
    interface Schema$CarouselCard {
        /**
       * The list of contents for each card in the carousel. A carousel can have a minimum of 2 cards and a maximum 10 cards.
       */
        cardContents: Schema$CardContent[];
        /**
     * The width of the cards in the carousel.
     */
        cardWidth: string;
    }
    /**
      * Message containing the content information.
      */
    interface Schema$ContentInfo {
        /**
       * Publicly reachable URL of the file. The RBM platform determines the MIME type of the file from the content-type field in the HTTP headers when the platform fetches the file. The content-type field must be present and accurate in the HTTP response from the URL.
       */
        fileUrl: string;
        /**
     * If set, the RBM platform fetches the file and thumbnail from the specified URLs, even if the platform has cached copies of the file (and/or of the thumbnail).
     */
        forceRefresh: boolean;
        /**
     * (Optional, for image and video files only) Publicly reachable URL of the thumbnail.  If you don&#39;t provide a thumbnail URL, the RBM platform displays a blank placeholder thumbnail until the user&#39;s device downloads the file. Depending on the user&#39;s setting, the file may not download automatically and may require the user to tap a download button.
     */
        thumbnailUrl: string;
    }
    /**
      * Opens the user&#39;s default calendar app and starts the new calendar event flow with the agent-specified event data pre-filled (https://goo.gl/ceJ3U1).
      */
    interface Schema$CreateCalendarEventAction {
        /**
       * Event description.
       */
        description: string;
        /**
     * Event end time.
     */
        endTime: string;
        /**
     * Event start time.
     */
        startTime: string;
        /**
     * Event title.
     */
        title: string;
    }
    /**
      * Request for creating file.
      */
    interface Schema$CreateFileRequest {
        /**
       * (Optional) Text description of the file&#39;s content. Screen readers use this description to help users with disabilities understand what the file contains.
       */
        contentDescription: string;
        /**
     * Publicly available URL of the file. The RBM platform determines the MIME type of the file from the content-type field in the HTTP headers when fetching the file.  Supported image content types: image/jpeg, image/jpg, image/gif, image/png.  Supported video content types: video/h263, video/m4v, video/mp4, video/mpeg, video/mpeg4, video/webm.
     */
        fileUrl: string;
        /**
     * (Optional, for image and video files only) Publicly available URL of the thumbnail corresponding to the file. If this field is not set, then the RBM platform automatically generates a thumbnail from the file. The RBM platform determines the MIME type of the file from the content-type field in the HTTP headers when fetching the file.  Supported image content types: image/jpeg, image/jpg, image/gif, image/png.
     */
        thumbnailUrl: string;
    }
    /**
      * Opens the user&#39;s default dialer app with the agent-specified phone number filled in (https://goo.gl/ergbB2).
      */
    interface Schema$DialAction {
        /**
       * The phone number in E.164 format, for example, +12223334444.
       */
        phoneNumber: string;
    }
    /**
      * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance:      service Foo {       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);     }  The JSON representation for `Empty` is empty JSON object `{}`.
      */
    interface Schema$Empty {
    }
    /**
      * A file resource with a unique name that an agent can use to identify the file when sending messages.
      */
    interface Schema$File {
        /**
       * Server-assigned unique name of the file resource, which an agent can use to identify the file when sending messages. The format is &quot;files/{uid}&quot;, where {uid} is a unique ID.
       */
        name: string;
    }
    /**
      * An object representing a latitude/longitude pair. This is expressed as a pair of doubles representing degrees latitude and degrees longitude. Unless specified otherwise, this must conform to the &lt;a href=&quot;http://www.unoosa.org/pdf/icg/2012/template/WGS_84.pdf&quot;&gt;WGS84 standard&lt;/a&gt;. Values must be within normalized ranges.
      */
    interface Schema$LatLng {
        /**
       * The latitude in degrees. It must be in the range [-90.0, +90.0].
       */
        latitude: number;
        /**
     * The longitude in degrees. It must be in the range [-180.0, +180.0].
     */
        longitude: number;
    }
    /**
      * A line item in a payment request.
      */
    interface Schema$LineItem {
        /**
       * The amount of the line item. SECONDARY line items may have a negative amount.
       */
        amount: Schema$Money;
        /**
     * The text for a line item. For example, &quot;Total due&quot;.
     */
        label: string;
        /**
     * (Optional) Text that is displayed in a smaller font below the line item label.
     */
        subText: string;
        /**
     * The line item type.
     */
        type: string;
    }
    /**
      * A media file within a rich card.
      */
    interface Schema$Media {
        /**
       * Information about a file, including the URL of the file and the URL of the file’s thumbnail.  The RBM platform serves content from a cache, but an agent can force the RBM platform to fetch a new version of the content and refresh the cache.
       */
        contentInfo: Schema$ContentInfo;
        /**
     * The unique name of the file, returned by the RBM platform when the file was uploaded.
     */
        fileName: string;
        /**
     * The height of the media within a rich card with a vertical layout (https://goo.gl/NeFCjz). For a standalone card with horizontal layout, height is not customizable, and this field is ignored.
     */
        height: string;
    }
    /**
      * Supported payment methods.
      */
    interface Schema$Method {
        /**
       * The countries that the payment request is valid in, as ISO-2 country codes. For example, `[&quot;US&quot;, &quot;MX&quot;]`.
       */
        allowedCountryCodes: string[];
        /**
     * The billing address format.
     */
        billingAddressFormat: string;
        /**
     * Whether or not the user must provide a billing address.
     */
        billingAddressRequired: boolean;
        /**
     * The merchant ID for the supported payment method.
     */
        merchantId: string;
        /**
     * The merchant name.
     */
        merchantName: string;
        /**
     * The payment method name. You must set this field to `&quot;https://paywith.google.com/pay&quot;`.
     */
        paymentMethod: string;
        /**
     * The supported card networks. For example, `[&quot;MASTERCARD&quot;, &quot;VISA&quot;, &quot;DISCOVER&quot;]`.
     */
        supportedCardNetworks: string[];
        /**
     * The supported card types. For example, `[&quot;DEBIT&quot;, &quot;CREDIT&quot;]`.
     */
        supportedCardTypes: string[];
        /**
     * Tokenization information for the payment request.
     */
        tokenizationData: Schema$TokenizationData;
    }
    /**
      * Represents an amount of money with its currency type.
      */
    interface Schema$Money {
        /**
       * The 3-letter currency code defined in ISO 4217.
       */
        currencyCode: string;
        /**
     * Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.
     */
        nanos: number;
        /**
     * The whole units of the amount. For example if `currencyCode` is `&quot;USD&quot;`, then 1 unit is one US dollar.
     */
        units: string;
    }
    /**
      * Opens the user&#39;s default web browser app to the specified URL (https://goo.gl/6GLJD2). If the user has an app installed that is registered as the default handler for the URL, then this app will be opened instead, and its icon will be used in the suggested action UI.
      */
    interface Schema$OpenUrlAction {
        /**
       * URL
       */
        url: string;
    }
    /**
      * Payment request action.
      */
    interface Schema$PaymentRequestAction {
        /**
       * Text that replaces the payment request text when the transaction is complete.
       */
        completedMessage: string;
        /**
     * Text that replaces the payment request text when the request is expired.
     */
        expiredMessage: string;
        /**
     * (Optional) A timestamp of when the payment request expires. If a payment request expires, the request becomes invalid.  If you specify a timestamp, the RCS-enabled messaging app doesn&#39;t verify an expiration time with the RBM agent. If you don&#39;t specify a timestamp, the payment request only expires if the agent flags the request as expired via the experation check webhook.
     */
        expireTime: string;
        /**
     * Payment request line items, including regular items, taxes, sub-total, and shipping.
     */
        items: Schema$LineItem[];
        /**
     * Supported payment methods.
     */
        paymentMethods: Schema$Method[];
        /**
     * The agent-assigned ID of the payment request. This may be a UUID, as defined in https://tools.ietf.org/html/rfc4122.
     */
        requestId: string;
        /**
     * This field is set by the RBM platform. Do not include it when creating a payment request. The field resolves to a checksum the RBM platform uses to validate the payment request.
     */
        signature: string;
        /**
     * The total amount of the payment request. The value must be positive.
     */
        total: Schema$LineItem;
    }
    /**
      * Request message for RBMService.RequestCapabilityCallback method.
      */
    interface Schema$RequestCapabilityCallbackRequest {
        /**
       * The ID of the request, assigned by the agent. This must be a UUID, as defined in https://tools.ietf.org/html/rfc4122. This request ID is included in the capability callback, which returns asynchronously.
       */
        requestId: string;
    }
    /**
      * A standalone rich card or a carousel of rich cards sent from the agent to the user (https://goo.gl/DwQLHd).
      */
    interface Schema$RichCard {
        /**
       * Carousel of cards.
       */
        carouselCard: Schema$CarouselCard;
        /**
     * Standalone card.
     */
        standaloneCard: Schema$StandaloneCard;
    }
    /**
      * Opens the RCS app&#39;s location chooser so the user can pick a location to send back to the agent (https://goo.gl/GXotJW).
      */
    interface Schema$ShareLocationAction {
    }
    /**
      * Standalone card
      */
    interface Schema$StandaloneCard {
        /**
       * Card content.
       */
        cardContent: Schema$CardContent;
        /**
     * Orientation of the card.
     */
        cardOrientation: string;
        /**
     * Image preview alignment for standalone cards with horizontal layout.
     */
        thumbnailImageAlignment: string;
    }
    /**
      * When tapped, initiates the corresponding native action on the device.
      */
    interface Schema$SuggestedAction {
        /**
       * Opens the user&#39;s default calendar app and starts the new calendar event flow with the agent-specified event data pre-filled (https://goo.gl/ceJ3U1).
       */
        createCalendarEventAction: Schema$CreateCalendarEventAction;
        /**
     * Opens the user&#39;s default dialer app with the agent-specified phone number filled in (https://goo.gl/ergbB2).
     */
        dialAction: Schema$DialAction;
        /**
     * Opens the user&#39;s default web browser app to the given URL (https://goo.gl/6GLJD2). If the user has an app installed that is registered as the default handler for the URL, then this app will be opened instead, and its icon will be used in the suggested action UI.
     */
        openUrlAction: Schema$OpenUrlAction;
        /**
     * Sends a payment request from the agent to the user.
     */
        paymentRequestAction: Schema$PaymentRequestAction;
        /**
     * Payload (base64 encoded) that will be sent to the agent in the user event that results when the user taps the suggested action
     */
        postbackData: string;
        /**
     * Opens the RCS app&#39;s location chooser so the user can pick a location to send to the agent (https://goo.gl/GXotJW).
     */
        shareLocationAction: Schema$ShareLocationAction;
        /**
     * Text that is shown in the suggested action.
     */
        text: string;
        /**
     * Opens the user&#39;s default map app and selects the agent-specified location or searches around the user&#39;s location given an agent-specified query (https://goo.gl/V3nRdR).
     */
        viewLocationAction: Schema$ViewLocationAction;
    }
    /**
      * When tapped, sends the text reply back to the agent (https://goo.gl/bGo5Td).
      */
    interface Schema$SuggestedReply {
        /**
       * The base64-encoded payload that the agent receives in a user event when the user taps the suggested reply.
       */
        postbackData: string;
        /**
     * Text that is shown in the suggested reply and sent back to the agent when the user taps it.
     */
        text: string;
    }
    /**
      * A suggested reply or a suggested action included within a rich card or within a suggestion chip list. (https://goo.gl/nrRMz7).
      */
    interface Schema$Suggestion {
        /**
       * Users can tap a suggested action to initiate the corresponding native action on the device.
       */
        action: Schema$SuggestedAction;
        /**
     * Users can tap a suggested reply to send the text reply back to the agent.
     */
        reply: Schema$SuggestedReply;
    }
    /**
      * A tester for the agent. The agent can interact with verified testers even if the agent has not yet launched.
      */
    interface Schema$Tester {
        /**
       * The status of the invitation.
       */
        inviteStatus: string;
        /**
     * This field is set by the RBM platform. Do not include it when creating a tester object. The field resolves &quot;phones/{E.164}/testers/{testerId}&quot;, where {E.164} is the tester&#39;s phone number in E.164 format and {testerId} is the agent-assigned ID of the tester.
     */
        name: string;
    }
    /**
      * Tokenization information for the payment request.
      */
    interface Schema$TokenizationData {
        /**
       * Tokenization parameters, such as the public key.
       */
        parameters: any;
        /**
     * The tokenization type for the payment processing provider.
     */
        tokenizationType: string;
    }
    /**
      * Opens the user&#39;s default map app and selects the agent-specified location or searches around the user&#39;s location given an agent-specified query (https://goo.gl/V3nRdR).
      */
    interface Schema$ViewLocationAction {
        /**
       * (Optional) The label of the pin dropped at lat_long.
       */
        label: string;
        /**
     * (Optional) The latitude and longitude of the specified location.
     */
        latLong: Schema$LatLng;
        /**
     * (Optional, only supported on Android Messages clients) Rather than specify a lat_long (and optionally, a label), the agent can instead specify a query string. For default map apps that support search functionality (including Google Maps), tapping this suggested action results in a location search centered around the user&#39;s current location. If the query is sufficiently specific, then agents can use it to select any location in the world.  For instance, setting the query string to &quot;Growing Tree Bank&quot; will show all Growing Tree Bank locations in the user&#39;s vicinity. Setting the query string to &quot;1600 Amphitheater Parkway, Mountain View, CA 94043&quot; will select that specific address, regardless of the user&#39;s location.
     */
        query: string;
    }
    class Resource$Files {
        root: Rcsbusinessmessaging;
        constructor(root: Rcsbusinessmessaging);
        getRoot(): Rcsbusinessmessaging;
        /**
         * rcsbusinessmessaging.files.create
         * @desc Uploads a file for use in media or rich card messages.  The agent provides the URL of the file and (optionally) the URL of the corresponding thumbnail file. The RBM platform returns a unique name that can be used to identify the file when sending agent messages.
         * @alias rcsbusinessmessaging.files.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().CreateFileRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params?: any, options?: MethodOptions): AxiosPromise<Schema$File>;
        create(params?: any, options?: MethodOptions | BodyResponseCallback<Schema$File>, callback?: BodyResponseCallback<Schema$File>): void;
    }
    class Resource$Phones {
        root: Rcsbusinessmessaging;
        agentEvents: Resource$Phones$Agentevents;
        agentMessages: Resource$Phones$Agentmessages;
        capability: Resource$Phones$Capability;
        testers: Resource$Phones$Testers;
        constructor(root: Rcsbusinessmessaging);
        getRoot(): Rcsbusinessmessaging;
    }
    class Resource$Phones$Agentevents {
        root: Rcsbusinessmessaging;
        constructor(root: Rcsbusinessmessaging);
        getRoot(): Rcsbusinessmessaging;
        /**
         * rcsbusinessmessaging.phones.agentEvents.create
         * @desc Sends an event from the agent to a user.  Agent events can be used to indicate that the agent has read a message from the user or that the agent is in the process of typing (which adds a human element to the RBM experience).  Unlike agent messages, agent events cannot be revoked after sending.
         * @alias rcsbusinessmessaging.phones.agentEvents.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.eventId The ID of the event, assigned by the agent. This must be a UUID, as defined in https://tools.ietf.org/html/rfc4122. The RBM platform ignores any agent message sent with an ID that was used by an earlier message or event sent from the same agent.
         * @param {string} params.parent "phones/{E.164}", where {E.164} is the user's phone number in E.164 format. For example, for a user with the US phone number +1-222-333-4444, the value would be phones/+12223334444, and the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/agentEvents.
         * @param {().AgentEvent} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params?: any, options?: MethodOptions): AxiosPromise<Schema$AgentEvent>;
        create(params?: any, options?: MethodOptions | BodyResponseCallback<Schema$AgentEvent>, callback?: BodyResponseCallback<Schema$AgentEvent>): void;
    }
    class Resource$Phones$Agentmessages {
        root: Rcsbusinessmessaging;
        constructor(root: Rcsbusinessmessaging);
        getRoot(): Rcsbusinessmessaging;
        /**
         * rcsbusinessmessaging.phones.agentMessages.create
         * @desc Sends a message from the agent to a user.  The user must be RCS enabled and reachable by the RBM platform in order for the agent to successfully send a message. When the message has been successfully sent, the call returns with no error. Otherwise, the agent receives an error code.  If the user is online, the RBM platform delivers the message right away. Otherwise, the RBM platform queues the message and delivered it when the user is next online.  The RBM platform ignores any agent message sent with an ID that was used by an earlier message or event sent from the same agent.  Agent messages can be revoked between the time that they are sent and the time that they are delivered.
         * @alias rcsbusinessmessaging.phones.agentMessages.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.messageId The unique ID of the message, assigned by the agent. This must be a UUID, as defined in https://tools.ietf.org/html/rfc4122. The RBM platform ignores any agent message sent with an ID that was used by an earlier message or event sent from the same agent.
         * @param {string} params.parent "phones/{E.164}", where {E.164} is the user's phone number in E.164 format. For example, with the US phone number +1-222-333-4444, the value would be phones/+12223334444, and the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/agentMessages.
         * @param {().AgentMessage} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params?: any, options?: MethodOptions): AxiosPromise<Schema$AgentMessage>;
        create(params?: any, options?: MethodOptions | BodyResponseCallback<Schema$AgentMessage>, callback?: BodyResponseCallback<Schema$AgentMessage>): void;
        /**
         * rcsbusinessmessaging.phones.agentMessages.delete
         * @desc Revokes an agent message that has been sent but not yet delivered.  If the RBM platform successfully revokes a message, then the message is deleted from the user’s message queue and is never delivered.  This method immediately returns 200 OK, whether or not the message was successfully revoked.  There is a small chance that the agent may initiate a revocation while the RBM platform is in the process of delivering the message. In these rare cases, the agent receives a DELIVERED user event for the message shortly after initiating the revocation request.
         * @alias rcsbusinessmessaging.phones.agentMessages.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name "phones/{E.164}/agentMessages/{messageId}", where {E.164} is the user's phone number in E.164 format and {messageId} is the agent-assigned ID of the agent message that should be revoked. For example, with the US phone number +1-222-333-4444 and an agent message with the ID "12345xyz", the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/agentMessages/12345xyz.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params?: any, options?: MethodOptions): AxiosPromise<Schema$Empty>;
        delete(params?: any, options?: MethodOptions | BodyResponseCallback<Schema$Empty>, callback?: BodyResponseCallback<Schema$Empty>): void;
    }
    class Resource$Phones$Capability {
        root: Rcsbusinessmessaging;
        constructor(root: Rcsbusinessmessaging);
        getRoot(): Rcsbusinessmessaging;
        /**
         * rcsbusinessmessaging.phones.capability.requestCapabilityCallback
         * @desc Requests a callback containing the capabilities of a user.  Following this request, the agent receives an asynchronous callback with the user's capabilities.
         * @alias rcsbusinessmessaging.phones.capability.requestCapabilityCallback
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name "phones/{E.164}/capability", where {E.164} is the user's phone number in E.164 format. For example, with the US phone number +1-222-333-4444, the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/capability:requestCapabilityCallback
         * @param {().RequestCapabilityCallbackRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        requestCapabilityCallback(params?: any, options?: MethodOptions): AxiosPromise<Schema$Empty>;
        requestCapabilityCallback(params?: any, options?: MethodOptions | BodyResponseCallback<Schema$Empty>, callback?: BodyResponseCallback<Schema$Empty>): void;
    }
    class Resource$Phones$Testers {
        root: Rcsbusinessmessaging;
        constructor(root: Rcsbusinessmessaging);
        getRoot(): Rcsbusinessmessaging;
        /**
         * rcsbusinessmessaging.phones.testers.create
         * @desc Invites a user to test an agent.  The invited user must be RCS-enabled and reachable by the RBM platform. When an agent invites a user to become a tester, an RBM platform management agent sends a message to the user asking for confirmation that she wants to be a tester of the agent. Once the user confirms, she becomes a tester.  An agent that has not yet launched can only interact with users who are testers of that agent. If an unlaunched agent attempts to send a message, event, or capability callback to a non-tester, the RBM platform returns a 403 PERMISSION_DENIED error.
         * @alias rcsbusinessmessaging.phones.testers.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent "phones/{E.164}", where {E.164} is the user's phone number in E.164 format. For example, with the US phone number +1-222-333-4444, the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/testers/.
         * @param {().Tester} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params?: any, options?: MethodOptions): AxiosPromise<Schema$Tester>;
        create(params?: any, options?: MethodOptions | BodyResponseCallback<Schema$Tester>, callback?: BodyResponseCallback<Schema$Tester>): void;
    }
}
