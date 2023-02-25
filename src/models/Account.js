export class Profile {
  constructor(data){
    this.name = data.name
    this.bio = data.bio
    this.picture = data.picture
    this.coverImg = data.coverImg
    this.subs = data.subs
    this.github = data.github
    this.linkedin = data.linkedin
    this.resume = data.resume
    this.class = data.class
    this.graduated = data.graduated
  }
}


export class Account extends Profile{
  constructor(data) {
    super(data)
    this.email = data.email
    // TODO add additional properties if needed
  }
}
