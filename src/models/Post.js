import { Profile } from "./Account.js"

export class Post {
  constructor(data){
    this.body = data.body
    this.createdAt = new Date(data.createdAt).toLocaleDateString()
    this.creator = new Profile(data.creator)
    this.creatorId = data.creatorId
    this.imgUrl = data.imgUrl
    this.creatorId = data.creatorId
    this.likeIds = data.likeIds
    this.postId = data.id
  }
}
