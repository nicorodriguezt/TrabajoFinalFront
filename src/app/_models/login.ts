export class Login {
  username: string;
  password: string;

  constructor (data){
    this.username = data.username;
    this.password = data.password;
  }
}
