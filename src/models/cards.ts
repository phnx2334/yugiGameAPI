// External dependencies
import { ObjectId } from 'mongodb';

// Class Implementation

export default class Card {
  constructor(
    public title: string,
    public type: string,
    public starCount: number,
    public imageRoute: string,
    public edition: string,
    public code: string,
    public hability: string,
    public description: string,
    public atk: number,
    public def: number,
    public numberCode: string,
    public copyright: string,
    public id?: number
  ) {}
}
