---
title: BinCodec - zombs.io Wiki
---
# `BinCodec`

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
Solves the PoW challenge that is part of the anti-bot mechanism of the game. The output of this function contains a PoW answer that is 64-byte long. See [`_MakeBlendField`](/architecture/engine/main/network/mbf/overview) for more info.

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
Encodes the secondary world entry packet. This packet is part of the anti-bot mechanism and in reality is a 17-byte long packet. See [`_MakeBlendField`](/architecture/engine/main/network/mbf/overview) for more info.

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

### Packet Interfaces

#### `ATTRIBUTE_MAP_ENTRY`

Internal structure populated during `decodeEnterWorldResponse`. One entry per attribute on an entity type.

```ts
interface ATTRIBUTE_MAP_ENTRY {
    name: string,
    type: e_AttributeType
}
```

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

`attributeMaps` defines all of the attributes that can be present on an entity and the type they are encoded as. A complete attribute map can be found [here](/asset/architecture/engine/main/network/BinCodec/attributeMaps.json).

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

There are a total of 40 RPCs in the game for both server and client RPCs. A complete RPC map can be found [here](/asset/architecture/engine/main/network/BinCodec/rpcMaps.json).
