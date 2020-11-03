import React, { Component, useState } from "react";
import { useModal, ModalProvider } from "use-modal-hook";
import Modal from "react-modal";
import ReactPlayer from "react-player";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


Modal.setAppElement("#root");


export class Gallery extends Component {
  state = { isOpen: false ,
  categoryIndex:0,
  itemIndex:0,
  };


  handleShowDialog = (catIndex,iIndex) => {
    this.setState({ 
      isOpen: !this.state.isOpen,
    categoryIndex: catIndex,
    itemIndex: iIndex,
    });
     
  };

  render() {
    const worksData = this.props.data;
    
    return (


      <div id="portfolio" className="text-center">
  
          <div className="section-title">
            <h2>Works Gallery</h2>
          </div>
<span class="badge badge-primary">Primary</span>
        <div className="container">
          <div>
            <div className="portfolio-items">
            {worksData
              ? worksData.map((d,i) => (

              <div  className="row">

          <div className="work-title">
            <h2>{d.title}</h2>
          </div>

          
            {d.contents.map((subItem, index) => (
                 
             <div className="col-sm-6 col-md-4 col-lg-4">
                <div className="portfolio-item">
                  <div className="hover-bg">
                    {" "}
                    <a
                      href="javascript:void(0);"
                      onClick={this.handleShowDialog.bind(this,i,index)}
                    >
                      <div className="hover-text">
                        <h4>{subItem.category}</h4>
                      </div>
                      <img
                        src={subItem.thumb}
                        className="img-responsive"
                        alt="Project Title"
                        />
                      {""}
                    </a> {" "}
                  </div>
                </div> 
                </div>
                           ))}

                      
              </div>
  )): "Loading..."}

            </div>
          </div>
        </div>
      
                            {this.state.isOpen && (
                        <Modal
                        isOpen={this.state.isOpen}
                        onRequestClose={this.handleShowDialog.bind(this,this.state.categoryIndex,this.state.itemIndex)}
                          contentLabel="My dialog"
                          className="mymodal"
                          overlayClassName="myoverlay"
                          closeTimeoutMS={500}
                        >
                          <div>
                            {
                                <div >
                                  <div className="player">                                  
  <Carousel autoPlay showThumbs={false} infiniteLoop={true} autoPlay={false}>  
  {worksData[this.state.categoryIndex].contents[this.state.itemIndex].playerContents.map((record) => 
  (
record.startsWith("https://youtu") ?
    <div >
    <ReactPlayer
        url={record} 
     width="auto" height="400px" /> 
  </div>
   :
   <div className="contentBox"  > 
   <img alt="" src={record} className="content" />
   

 </div>

))}

               
 </Carousel> 
  

      </div>
       <div className="textBox">    
       <text>
                                  < h3 > {worksData[0].title}</h3>
                                  <p>{worksData[0].text}</p>
                                  <button type="button" class="btn btn-primary" onClick={this.handleShowDialog}>Close modal</button>
                                  </text>
                                  </div>
                                </div>
                              
                            }

                          </div>
                        
                        </Modal>
                      )}
      </div>
    );
  }
}

export default Gallery;
