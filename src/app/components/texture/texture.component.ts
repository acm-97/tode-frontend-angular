import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader-service.service';

@Component({
  selector: 'app-texture',
  templateUrl: './texture.component.html',
  styleUrls: ['./texture.component.css']
})
export class TextureComponent implements OnInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) {}

  ngOnInit() {
    // Just call your load scripts function with scripts you want to load
    this.loadScripts();
  }
  
  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('substance', 'katex', 'texture', 'texture-plugin', 'vfs', 'demo').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }

}
