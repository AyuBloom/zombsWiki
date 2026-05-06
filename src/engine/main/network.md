# `network`

The `network` component handles all communication between the client and the server. It includes low-level socket management, binary encoding/decoding via `ByteBuffer` and a novel anti-bot mechanism.

## `NetworkAdapter` <Badge type="danger" text="private" />

### Methods

#### `constructor()`
```ts
function constructor(): void
```
Initializes a new `EventEmitter` as `this.emitter` and sets up a default handler for `PACKET_BLEND`.

#### `sendEnterWorld()`
```ts
function sendEnterWorld(data: object): void
```
Sends a `PACKET_ENTER_WORLD` packet.

#### `sendEnterWorld2()`
```ts
function sendEnterWorld2(): void
```
Sends a `PACKET_ENTER_WORLD2` packet. No data is passed to this function.

#### `sendInput()`
```ts
function sendInput(data: Record<string, number>): void
```
Sends a `PACKET_INPUT` packet containing player inputs. See [`inputPacketCreator`](/engine/main/input/inputPacketCreator) for a list of possible input data.

#### `sendPing()`
```ts
function sendPing(data: object): void
```
Sends a `PACKET_PING` packet.

#### `sendRpc()`
```ts
function sendRpc(data: CLIENT_RPC_DATA): void
```
Sends a `PACKET_RPC` packet. 

#### `addEnterWorldHandler()`
```ts
function addEnterWorldHandler(callback: (data: ENTER_WORLD_DATA) => void): void
```
Registers a handler for `PACKET_ENTER_WORLD` responses.

#### `addPreEnterWorldHandler()`
```ts
function addPreEnterWorldHandler(callback: Function): void
```
Registers a handler for `PACKET_PRE_ENTER_WORLD` responses.

#### `addEntityUpdateHandler()`
```ts
function addEntityUpdateHandler(callback: (data: ENTITY_UPDATE_DATA) => void): void
```
Registers a handler for `PACKET_ENTITY_UPDATE` packets.

#### `addPingHandler()`
```ts
function addPingHandler(callback: (data: PING_DATA) => void): void
```
Registers a handler for `PACKET_PING` packets.

#### `addRpcHandler()`
```ts
function addRpcHandler(name: string, callback: (data: SERVER_RPC_DATA) => void): void
```
Registers a handler for a specific RPC response by name.

#### `addConnectHandler()`
```ts
function addConnectHandler(callback: Function): void
```
Registers a handler for the `connected` WebSocket event.

#### `addCloseHandler()`
```ts
function addCloseHandler(callback: Function): void
```
Registers a handler for the `close` WebSocket event.

#### `addErrorHandler()`
```ts
function addErrorHandler(callback: Function): void
```
Registers a handler for the `error` WebSocket event.

#### `addPacketHandler()`
```ts
function addPacketHandler(event: number, callback: Function): void
```
Registers a raw packet handler using the `PacketId`.

## BinNetworkAdapter <Badge type="tip" text="public" />

Bounded to `game` as `game.network`. Extends `NetworkAdapter`, alias: `game.networkType`

### Properties

| Properties | Type | Description |
| :--- | :--- | :--- |
| `pingStart` | `Date \| null` | The timestamp when the last ping was sent. |
| `pingCompletion` | `Date \| null` | The timestamp when the last ping response was received. |
| `ping` | `number` | The current round-trip time divided by 2 (latency). |
| `connected` | `boolean` | Whether the socket is currently connected. |
| `connecting` | `boolean` | Whether the socket is currently in the process of connecting. |
| `codec` | `BinCodec` | The codec used for encoding and decoding binary packets. |
| `socket` | `WebSocket` | The underlying WebSocket instance. |
| `connectionOptions` | `object` | The options used for the current connection (hostname, port, etc.). |

### Methods

#### `connect()`
```ts
function connect(options: object): void
```
Initiates a WebSocket connection to `wss://{options.hostname}:{options.port}`.

#### `bindEventListeners()`
```ts
function bindEventListeners(): void
```
Binds WebSocket events (`open`, `message`, `close`, `error`) to the internal emitter.

#### `disconnect()`
```ts
function disconnect(): void
```
Closes the WebSocket connection.

#### `reconnect()`
```ts
function reconnect(): void
```
Attempts to reconnect using the last used `connectionOptions`.

#### `getPing()`
```ts
function getPing(): number
```
Returns the current `ping` value.

#### `sendPacket()`
```ts
function sendPacket(event: number, data: object): void
```
Encodes the data using the `codec` and sends it over the WebSocket.

#### `onMessage()`
```ts
function onMessage(event: MessageEvent): void
```
Handles incoming WebSocket messages, decodes them, and emits the corresponding packet event.

#### `sendPingIfNecessary()`
```ts
function sendPingIfNecessary(): void
```
Sends a ping packet if 5 seconds have passed since the last ping completion.

#### `onPing()`
```ts
function onPing(): void
```
Calculates the latency when a ping response is received.

## `BinCodec` <Badge type="danger" text="private" />

The `BinCodec` class handles the serialization and deserialization of game data into a compact binary format using `ByteBuffer`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `attributeMaps` | `Record<number, ATTRIBUTE_MAP_ENTRY[]>` | Maps entity type IDs to their attribute definitions. Populated during `decodeEnterWorldResponse`. |
| `entityTypeNames` | `Record<number, string>` | Maps entity type IDs to their string names. Populated during `decodeEnterWorldResponse`. |
| `rpcMaps` | `RPC_MAP_ENTRY[]` | Array of all registered RPC definitions, indexed by RPC index. Populated during `decodeEnterWorldResponse`. |
| `rpcMapsByName` | `Record<string, RPC_MAP_ENTRY>` | Maps RPC names to their definitions. Populated during `decodeEnterWorldResponse`. |
| `sortedUidsByType` | `Record<number, number[]>` | Tracks sorted entity UIDs per entity type for delta encoding. Updated during entity updates. |
| `removedEntities` | `Record<number, number>` | Tracks entities removed in the current tick. Cleared each `decodeEntityUpdate` call. |
| `absentEntitiesFlags` | `number[]` | Reusable buffer for bitflags indicating which entities are absent in the current update. |
| `updatedEntityFlags` | `number[]` | Reusable buffer for bitflags indicating which attributes were updated for an entity. |

### Methods

#### `encode()`
```ts
function encode(name: number, item: object): ArrayBuffer
```
Encodes a packet into an `ArrayBuffer`.

#### `decode()`
```ts
function decode(data: ArrayBuffer): object
```
Decodes a packet from an `ArrayBuffer`.

#### `safeReadVString()`
```ts
function safeReadVString(buffer: ByteBuffer): string
```
Safely reads a variable-length string from the buffer.

#### `decodePreEnterWorldResponse()`
```ts
function decodePreEnterWorldResponse(buffer: ByteBuffer): object
```
Decodes the pre-entry packet, which calls `decodeBlendInternal` internally.

#### `decodeEnterWorldResponse()`
```ts
function decodeEnterWorldResponse(buffer: ByteBuffer): object
```
Decodes the world entry response, including world dimensions, tick rates, and the full attribute/RPC maps.

#### `decodeEntityUpdate()`
```ts
function decodeEntityUpdate(buffer: ByteBuffer): object
```
Decodes an entity update packet. This handles removed entities, newly created entities, and updated attributes for existing entities.

#### `decodePing()`
```ts
function decodePing(buffer: ByteBuffer): object
```
Decodes a ping packet (returns empty object).

#### `encodeRpc()`
```ts
function encodeRpc(buffer: ByteBuffer, item: object): void
```
Encodes an RPC call based on its registered parameter types.

#### `decodeBlend()`
```ts
function decodeBlend(buffer: ByteBuffer): object
```
Decodes the occasional blend packet, which calls `decodeBlendInternal` internally.

#### `decodeBlendInternal()`
```ts
function decodeBlendInternal(buffer: ByteBuffer): object
```
Solves the PoW challenge that is part of the anti-bot mechanism of the game. The output of this function contains a PoW answer that is 64-byte long. See [`MakeBlendField`](/mbf/overview) for more info.

#### `decodeRpcObject()`
```ts
function decodeRpcObject(buffer: ByteBuffer, parameters: Array): object
```
Decodes a single RPC response object based on its parameter definitions.

#### `decodeRpc()`
```ts
function decodeRpc(buffer: ByteBuffer): object
```
Decodes an RPC response, handling both single objects and arrays of objects.

#### `encodeBlend()`
```ts
function encodeBlend(buffer: ByteBuffer, item: {extra: Uint8Array}): void
```
Encodes a blend packet.

#### `encodeEnterWorld2()`
```ts
function encodeEnterWorld2(buffer: ByteBuffer): void
```
Encodes the secondary world entry packet. This packet is part of the anti-bot mechanism and in reality is a 17-byte long packet. See [`MakeBlendField`](/mbf/overview) for more info.

#### `encodeEnterWorld()`
```ts
function encodeEnterWorld(buffer: ByteBuffer, item: {displayName: string, extra: Uint8Array}): void
```
Encodes the primary world entry packet. 

#### `encodeInput()`
```ts
function encodeInput(buffer: ByteBuffer, item: object): void
```
Encodes player input as a JSON string.

#### `encodePing()`
```ts
function encodePing(buffer: ByteBuffer): void
```
Encodes a ping packet.

## Enumerations

### `PacketIds` <Badge type="danger" text="private" />

`PacketIds` is a set of constants representing the different types of packets sent and received by the network (each type of packet is referred to as a `PacketId`).

| Constant | Value | Description |
| :--- | :--- | :--- |
| `PACKET_ENTITY_UPDATE` | `0` | Received every 50ms to update world entities. |
| `PACKET_PLAYER_COUNTER_UPDATE` | `1` | Currently unused. |
| `PACKET_SET_WORLD_DIMENSIONS` | `2` | Currently unused. |
| `PACKET_INPUT` | `3` | Sent to the server containing player input. |
| `PACKET_ENTER_WORLD` | `4` | Sent to request entry to the world & used by the anti-bot mechanism; also received as an enter world response. |
| `PACKET_PRE_ENTER_WORLD` | `5` | Received before entering the world. |
| `PACKET_ENTER_WORLD2` | `6` | Used by the anti-bot mechanism. Is sent to the server after entering world. |
| `PACKET_PING` | `7` | Used for latency measurement. |
| (no name set) | `8` | Supposedly used for skill points. See [Skill Points](/bugs/inactive/skill_point). |
| `PACKET_RPC` | `9` | Used for Remote Procedure Calls (RPC). |
| `PACKET_BLEND` | `10` | Used by the anti-bot mechanism. Is received and sent at irregular intervals while in world. |

### `e_AttributeType` <Badge type="danger" text="private" />

| Constant | Value | Notes |
| :--- | :--- | :--- |
| `Uninitialized` | `0` | |
| `Uint32` | `1` | |
| `Int32` | `2` | |
| `Float` | `3` | Stored as `Int32` / 100 |
| `String` | `4` | |
| `Vector2` | `5` | Two `Float`s |
| `EntityType` | `6` | |
| `ArrayVector2` | `7` | |
| `ArrayUint32` | `8` | |
| `Uint16` | `9` | |
| `Uint8` | `10` | |
| `Int16` | `11` | |
| `Int8` | `12` | |
| `Uint64` | `13` | |
| `Int64` | `14` | |
| `Double` | `15` | |

### `e_ParameterType` <Badge type="danger" text="private" />

| Constant | Value |
| :--- | :--- |
| `Uint32` | `0` |
| `Int32` | `1` |
| `Float` | `2` |
| `String` | `3` |
| `Uint64` | `4` |
| `Int64` | `5` |

## Data Interfaces

These are not present in the source code, but are inferred from the packets sent by the server.

### Packet Interfaces

#### `ENTER_WORLD_DATA`

```ts
interface ENTER_WORLD_DATA {
    allowed: boolean,
    uid: string,
    startingTick: number,
    tickRate: number,
    effectiveTickRate: number,
    players: number,
    maxPlayers: number,
    chatChannel: number,
    effectiveDisplayName: string,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    opcode: number
}
```

::: info
`ENTER_WORLD_DATA` also populates `BinCodec`'s internal `attributeMaps`, `entityTypeNames`, `sortedUidsByType`, and `rpcMaps` / `rpcMapsByName` tables. These are not returned directly but are used by subsequent `decodeEntityUpdate` and `decodeRpc` calls.
:::

#### `ENTITY_UPDATE_DATA`

```ts
interface ENTITY_UPDATE_DATA {
    opcode: number,
    tick: number,
    entities: Record<string, ENTITY_DATA | true>,
    byteSize: number
}
```

::: tip
When an entity is present in the update but has no changed attributes, it is stored as `true` instead of a full `ENTITY_DATA` object. This signals that the entity still exists but can reuse its previous tick data.
:::

#### `ENTITY_DATA`

The shape of this object is dynamic as its keys are determined by the entity's `attributeMap` received during `ENTER_WORLD_DATA`. All entities include a `uid` field; the remaining fields depend on the entity type.

```ts
interface ENTITY_DATA {
    uid: number,
    [attributeName: string]: number | string | Vector2 | Vector2[] | number[]
}
```

#### `ATTRIBUTE_MAP_ENTRY`

Internal structure populated during `decodeEnterWorldResponse`. One entry per attribute on an entity type.

```ts
interface ATTRIBUTE_MAP_ENTRY {
    name: string,
    type: e_AttributeType
}
```

#### `PING_DATA`

```ts
interface PING_DATA {
    opcode: number
}
```

::: info
The ping response carries no payload as it is an empty object. The `opcode` field is added by the top-level `decode()` method.
:::

#### `RPC_DATA`

```ts
interface SERVER_RPC_DATA {
    opcode: number,
    name: string,
    response: Record<string, any> | Record<string, any>[]
}
```

::: info
If the RPC is defined as an array type (`isArray`), `response` will be an array of objects. Otherwise it will be a single object.
:::

```ts
interface CLIENT_RPC_DATA {
    name: string,
    [parameter: string]: string | number
}
```

::: tip
The shape of each RPC is determined by the RPC's `parameters` from `rpcMaps`. If the RPC is client-side, `parameters` will be injected directly into the RPC object. If it is a server-side RPC, `parameters` will be inside of `response`.
:::

#### `RPC_MAP_ENTRY`

Internal structure populated during `decodeEnterWorldResponse`. One entry per registered RPC.

```ts
interface RPC_MAP_ENTRY {
    name: string,
    parameters: RPC_PARAMETER_ENTRY[],
    isArray: boolean,
    index: number
}
```

#### `RPC_PARAMETER_ENTRY`

```ts
interface RPC_PARAMETER_ENTRY {
    name: string,
    type: e_ParameterType
}
```

### Attribute Interfaces

#### `Vector2`

```ts
interface Vector2 {
    x: number,
    y: number
}
```

## Schemas

### `attributeMaps`, `entityTypeNames` and `rpcMaps`

These variables are defined directly by server data (`PACKET_ENTER_WORLD`) and stored as variables in `BinCodec`.

#### `attributeMaps`

`attributeMaps` defines all of the attributes that can be present on an entity and the type they are encoded as. A complete attribute map can be found [here](/asset/engine/main/network/attributeMaps.json).

#### `entityTypeNames`

| ID | Entity Type |
| :--- | :--- |
| `667546015` | `Pet` |
| `742594995` | `GoldMine` |
| `1059671174` | `Zombie` |
| `1372600389` | `Stone` |
| `1496910567` | `Neutral` |
| `1566069472` | `PlayerObject` |
| `1672634632` | `NeutralCamp` |
| `1816895259` | `GameProjectile` |
| `2092990061` | `Trap` |
| `2093252446` | `Tree` |
| `2347737811` | `GamePlayer` |
| `2402467733` | `GoldStash` |
| `2462472648` | `Spell` |
| `2464630638` | `Door` |
| `2899981078` | `Harvester` |
| `2969697641` | `Tower` |

#### `rpcMaps`

There are a total of 40 RPCs in the game for both server and client RPCs. A complete RPC map can be found [here](/asset/engine/main/network/rpcMaps.json).
