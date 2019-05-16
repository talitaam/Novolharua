import React from 'react';

import './Slider.scss';

class Slider extends React.Component {
    constructor() {
        super();
        this.state = {
            range: true,
            min: 1,
            max: 500,
            step: 1,
            values: [1, 100]
        }


    }

    // $(function() {

    //     // Initiate Slider
    //     $('#slider-range').slider({
    //     });

    //     // // Move the range wrapper into the generated divs
    //     // $('.ui-slider-range').append($('.range-wrapper'));


    //     // Show the gears on press of the handles
    //     $('.ui-slider-handle, .ui-slider-range').on('mousedown', function() {
    //       $('.gear-large').addClass('active');
    //     });

    //     // Hide the gears when the mouse is released
    //     // Done on document just incase the user hovers off of the handle
    //     $(document).on('mouseup', function() {
    //       if ($('.gear-large').hasClass('active')) {
    //         $('.gear-large').removeClass('active');
    //       }
    //     });

    //     // Rotate the gears
    //     var gearOneAngle = 0,
    //       gearTwoAngle = 0,
    //       rangeWidth = $('.ui-slider-range').css('width');

    //     $('.gear-one').css('transform', 'rotate(' + gearOneAngle + 'deg)');
    //     $('.gear-two').css('transform', 'rotate(' + gearTwoAngle + 'deg)');

    //     $('#slider-range').slider({
    //       slide: function(event, ui) {

    //         // Update the range container values upon sliding

    //         // Get old value
    //         var previousVal = parseInt($(this).data('value'));

    //         // Save new value
    //         $(this).data({
    //           'value': parseInt(ui.value)
    //         });

    //         // Figure out which handle is being used
    //         if (ui.values[0] == ui.value) {

    //           // Left handle
    //           if (previousVal > parseInt(ui.value)) {
    //             // value decreased
    //             gearOneAngle -= 7;
    //             $('.gear-one').css('transform', 'rotate(' + gearOneAngle + 'deg)');
    //           } else {
    //             // value increased
    //             gearOneAngle += 7;
    //             $('.gear-one').css('transform', 'rotate(' + gearOneAngle + 'deg)');
    //           }

    //         } else {

    //           // Right handle
    //           if (previousVal > parseInt(ui.value)) {
    //             // value decreased
    //             gearOneAngle -= 7;
    //             $('.gear-two').css('transform', 'rotate(' + gearOneAngle + 'deg)');
    //           } else {
    //             // value increased
    //             gearOneAngle += 7;
    //             $('.gear-two').css('transform', 'rotate(' + gearOneAngle + 'deg)');
    //           }

    //         }

    //         if (ui.values[1] === 110000) {
    //           if (!$('.range-alert').hasClass('active')) {
    //             $('.range-alert').addClass('active');
    //           }
    //         } else {
    //           if ($('.range-alert').hasClass('active')) {
    //             $('.range-alert').removeClass('active');
    //           }
    //         }
    //       }
    //     });
    //   });
    // ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all
    render() {
        const { values } = this.state;

        return (<div className="wrapper">
            <div className="container">
                <div className="slider-wrapper">
                    <div id="slider-range">
                        <div className="range-wrapper">
                            <div className="range">
                                <span className="range-value"> {values[0]} </span>
                                <span className="range-divider"></span>
                                <span className="range-value"> {values[1]} </span>
                            </div>
                            <div className="range-alert">+</div>
                            <div className="gear-wrapper">
                                <div className="gear-large active gear-one">
                                    <div className="gear-tooth"></div>
                                    <div className="gear-tooth"></div>
                                    <div className="gear-tooth"></div>
                                    <div className="gear-tooth"></div>
                                </div>
                                <div className="gear-large active gear-two">
                                    <div className="gear-tooth"></div>
                                    <div className="gear-tooth"></div>
                                    <div className="gear-tooth"></div>
                                    <div className="gear-tooth"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="marker marker-0">1</div>
                    <div className="marker marker-100">500+</div>
                </div>
            </div>
        </div>);
    }
}

export default Slider;
