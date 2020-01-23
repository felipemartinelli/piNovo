import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from '../model/Post';
import { Router } from '@angular/router';
import { Globals } from '../model/Globals';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  providers: [ Globals ]
})
export class FeedComponent implements OnInit {

  usuario: Usuario;
  posts: Post[];
  private idBusca:number;
  private _msgErro: string = null;
  private _post: Post=null;
  private vetorOunao: boolean = true;
  private textPost: string;
  public post: Post = new Post();
  private i: number = 1;
  

  constructor(private postService: PostService, private router: Router) { }

   

  ngOnInit() {
    this.acharTodos();
    this.usuario = Globals.user;
    if (!this.usuario){
      this.router.navigate(['/home']);
      }
      else{
      this.usuario = Globals.user;
    }
  }

  acharTodos(){
    this.postService.getAllPosts().subscribe((postOut: Post[]) => this.posts = postOut);
    console.log(this.posts);
      this.vetorOunao = true;
      console.log(this.vetorOunao);
    }

    enviarDados(){
    if (this.textPost != null || this.textPost != ""){
     this.post.idPostagem = this.i++; 
     this.post.texto = this.textPost;
     this.post.dataInclusao = "23/01/2020";

      this.postService.inserePost(this.post).subscribe(
        res =>{
          this.acharTodos();
        },
        err=>{
          console.log(err);
          alert("Erro ao inserir");
        }
      )
    }
    else{
      alert("Não é possivel incluir um texto em branco");
    }

    }



    private pesquisar(){
      if (this.idBusca <= 0){
        this._msgErro = "Digite um numero valido";
      }
      else{ 
        this._msgErro = null;
        this.postService.recuperaPostPeloID(this.idBusca).subscribe((res: Post) => {
          this._post = res;
          this.vetorOunao = false;
          console.log(this.vetorOunao);
          console.log(this._post);
        });
      }
    }    

}
