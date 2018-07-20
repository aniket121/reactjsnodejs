import React from 'react';
import SkyLight, {SkyLightStateless} from 'react-skylight';

class Modal extends React.Component {
  constructor(props){
    super(props);
    
    console.log( this.props.data,'-----------------------data-----------')
  }
  //to create all dynamic fields like
  //title
  //button name
  //text filed
  //etc

  componentDidMount(){
    this.simpleDialog.show()
  }

  render() {

    return (
      <div>
        <SkyLight  hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title={<p style={{display: 'flex', justifyContent: 'center'}}>
            <b><h3>ooo</h3></b></p>}>
            {/* {this.props.data.title} */}
            {/* {this.props.data.delete} */}
        </SkyLight>
      </div>
    )
  }
}

Modal.displayName = 'Modal';

export default Modal;