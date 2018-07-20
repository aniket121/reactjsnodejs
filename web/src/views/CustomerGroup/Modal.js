import React from 'react';
import SkyLight, { SkyLightStateless } from 'react-skylight';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props.data, '-----------------------data-----------')
  }


  componentDidMount() {
    this.simpleDialog.show()
  }

  render() {

    return (
      <div>
        <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title={<p style={{ display: 'flex', justifyContent: 'center' }}>
          <b><h3>ooo</h3></b></p>}>
        </SkyLight>

      </div>

    )
  }
}

Modal.displayName = 'Modal';

export default Modal;