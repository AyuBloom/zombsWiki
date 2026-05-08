# util

The `Util` class is a private utility class that is used internally to provide a collection of static helper methods.

## `Util` <Badge type="danger" text="private" />

### Methods

#### `lerp()`
```ts
static function lerp(start: number, end: number, ratio: number): number
```
Performs linear interpolation between `start` and `end` based on `ratio`. The `ratio` is capped at 1.2; if it exceeds that value, it is clamped to 1.

#### `mod()`
```ts
static function mod(a: number, b: number): number
```
Calculates the mathematical modulo of `a % b`. Unlike the standard JavaScript `%` operator, this function correctly handles negative numbers, ensuring the result is always within the range `[0, b)`.

#### `interpolateYaw()`
```ts
static function interpolateYaw(target: number, from: number): number
```
Interpolates between two rotation angles (in degrees) based on the current renderer tick progress. It ensures the rotation follows the shortest path between the two angles.

#### `angleTo()`
```ts
static function angleTo(xFrom: number, yFrom: number, xTo: number, yTo: number): number
```
Calculates the angle in degrees from point `(xFrom, yFrom)` to point `(xTo, yTo)`.

#### `hexToRgb()`
```ts
static function hexToRgb(hex: string): object | null
```
Converts a hexadecimal color string (e.g., `#FFFFFF` or `#FFF`) into an object with `r`, `g`, and `b` properties. Returns `null` if the input string is invalid.

#### `canAfford()`
```ts
static function canAfford(data: object, tier: number = 1, multiplier: number = 1): boolean
```
Checks if the player currently has enough resources (wood, stone, gold, tokens) to afford an item at the specified `tier` and `multiplier`.

#### `createResourceCostString()`
```ts
static function createResourceCostString(data: object, tier: number = 1, multiplier: number = 1): string
```
Generates a formatted HTML string representing the resource costs. If the player cannot afford a specific resource, the generated span includes the `hud-resource-low` CSS class.

#### `createResourceRefundString()`
```ts
static function createResourceRefundString(data: object, tier: number = 1): string
```
Generates a formatted HTML string representing the resource refund amount, typically calculated as 50% of the total costs spent up to the current tier.
