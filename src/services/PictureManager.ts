import { CasePicture } from "../types/Memory";

/**
 * List of playing cards used to play.
 */
const pictureManager = [
  '../src/assets/abricot.jpg',
  '../src/assets/abricot-2.jpg',
  '../src/assets/banana.jpg',
  '../src/assets/cherry.jpg',
  '../src/assets/grape.jpg',
  '../src/assets/green-apple.jpg',
  '../src/assets/green-lemon.jpg',
  '../src/assets/mango.jpg',
  '../src/assets/orange.jpg',
  '../src/assets/pasteque.jpg',
  '../src/assets/pear.jpg',
  '../src/assets/plum.jpg',
  '../src/assets/pomegranate.jpg',
  '../src/assets/raspberry.jpg',
  '../src/assets/red-apple.jpg',
  '../src/assets/strawberry.jpg',
  '../src/assets/yellow-cherry.jpg',
  '../src/assets/yellow-lemon.jpg',
]


export default class PictureManager {
  public static instance: PictureManager
  public cases: CasePicture[] = []
  public caseBuilder: Map<string, number> = new Map()

  /**
   * Based on the Singleton design pattern,
   * it allows to get the instance from anywhere in the application.
   */
  public static getInstance () {
    if (!this.instance) {
      this.instance = new PictureManager()
    }
    return this.instance
  }

  /**
   * Initialize the game,
   * dispatch the squares randomly on the board.
   */
  public initialize (): CasePicture[] {
    while (this.cases.length < 36) {
      const rand = this.getRandomInt(0, 17)
      this.isAlreadyExist(rand)
    }
    return this.cases
  }

  /**
   * When placing the cards,
   * we have to check that they are not placed more than twice.
   * @param random
   * @private
   */
  private isAlreadyExist (random: number) {
    const caseBuilder = this.caseBuilder.get(pictureManager[random])
    if (!caseBuilder) {
      this.caseBuilder.set(pictureManager[random], 1)
      this.setupFruit(pictureManager, random)
    }

    if (caseBuilder < 2) {
      this.caseBuilder.set(pictureManager[random], caseBuilder + 1)
      this.setupFruit(pictureManager, random)
    }
  }

  /**
   * Place the cards one by one on the board.
   * @param pictureManager
   * @param random
   * @private
   */
  private setupFruit (pictureManager, random) {
    this.cases.push({
      fruit: this.getFruitName(pictureManager[random]),
      path: pictureManager[random]
    })
  }

  /**
   * Returns a value randomly between the given value range,
   * retrieves a random image from the list.
   * @param min
   * @param max
   * @private
   */
  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
  }

  /**
   * Transform the path of the given box
   * to obtain the name of the associated fruit.
   * @param path
   */
  public getFruitName (path: string) {
    return path.split('/').pop()
  }
}