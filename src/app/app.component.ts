import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  imageSrc;
  sellersPermitFile: any;
  DriversLicenseFile: any;
  InteriorPicFile: any;
  ExteriorPicFile: any;
  //base64s
  sellersPermitString: string;
  DriversLicenseString: string;
  InteriorPicString: string;
  ExteriorPicString: string;
  //json
  finalJson = {};

  currentId: number = 0;

  addPictures() {
    this.finalJson = {
      "sellersPermitFile": this.ExteriorPicString,
      "DriversLicenseFile": this.DriversLicenseString,
      "InteriorPicFile": this.InteriorPicString,
      "ExteriorPicFile": this.ExteriorPicString
    }
  }
  public picked(event, field) {
    this.currentId = field;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (field == 1) {
        this.sellersPermitFile = file;
        this.handleInputChange(file); //turn into base64
      }
      else if (field == 2) {
        this.DriversLicenseFile = file;
        this.handleInputChange(file); //turn into base64
      }
      else if (field == 3) {
        this.InteriorPicFile = file;
        this.handleInputChange(file); //turn into base64
      }
      else if (field == 4) {
        this.ExteriorPicFile = file;
        this.handleInputChange(file); //turn into base64

      }
    }
    else {
      alert("No file selected");
    }
  }


  handleInputChange(files) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    //this.imageSrc = base64result;
    let id = this.currentId;
    switch (id) {
      case 1:
        this.sellersPermitString = base64result;
        break;
      case 2:
        this.DriversLicenseString = base64result;
        break;
      case 3:
        this.InteriorPicString = base64result;
        break;
      case 4:
        this.ExteriorPicString = base64result;
        break
    }

    this.log();
  }

  log() { 
    // for debug
    console.log('1', this.sellersPermitString);
    console.log('2', this.DriversLicenseString);
    console.log('3', this.InteriorPicString);
    console.log('4', this.ExteriorPicString);
  }

}
