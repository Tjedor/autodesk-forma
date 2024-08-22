export type Point = [number, number];

export type Polygon = Point[];

export type BuildingLimit = {
  type: string;
  geometry: {
    type: string;
    coordinates: Polygon[];
  };
  properties: {};
};

export type HeightPlateau = {
  type: string;
  geometry: {
    type: string;
    coordinates: Polygon[];
  };
  properties: {
    elevation: number;
  };
};

export class BadInputError extends Error {
  constructor(msg: string) {
    super(msg);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, BadInputError.prototype);
  }

  sayHello() {
    return "hello " + this.message;
  }
}
