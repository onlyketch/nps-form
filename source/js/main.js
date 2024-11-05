document.addEventListener('DOMContentLoaded', function() {
    let params = new URLSearchParams(window.location.search);
    let lang = params.get('lang');

    function translateToEng() {
        if (lang == 'en' || lang == 'EN') {
            //STEP 1
            $('#step1 > .nps-survey__question').text('How do you rate the work of the team?');
            $('#step1 > .nps-survey__description').text('We create the most accurate forecasts thanks to many years of international practice and unique work experience');

            $('#team-speed > .nps-survey__grade-name').text('Speed of interaction');
            $('#team-communication > .nps-survey__grade-name').text('Communication');
            $('#team-professionalism > .nps-survey__grade-name').text('Professionalism');
            $('#team-work > .nps-survey__grade-name').text('Approach to the work');

            //STEP 2
            $('#step2 > .nps-survey__question').text('Please rate the proposed solution');
            $('#step2 > .nps-survey__description').text('We create the most accurate forecasts thanks to many years of international practice and unique work experience');

            $('#task-grade > .nps-survey__grade-name').text('Goal achievement');
            $('#task-time > .nps-survey__grade-name').text('Deadlines');
            $('#presentations > .nps-survey__grade-name').text('Presentation materials');
            $('#manager-job > .nps-survey__grade-name').text('The work of your manager');
            $('#quality > .nps-survey__grade-name').text('Correlation of price and quality');

            //STEP 3
            $('#step3 > .nps-survey__question').text('How likely are you to recommend us?');
            $('#step3 > .nps-survey__description').text('We create the most accurate forecasts thanks to many years of international practice and unique work experience');

            $('#chance-reference > .nps-survey__grade-name').text('How likely are you to recommend us?');
            $('#contact-again > .nps-survey__grade-name').text('How likely are you to contact us again?');
            $('#survey-comment > .nps-survey__grade-name').text('Here you can write any comments and wishes');

            //THANKS SCREEN
            $('#step4 > .nps-survey__question').text('Thank you!');
            $('#step4 > .nps-survey__description').text('We create the most accurate forecasts thanks to many years of international practice and unique work experience');

            $('.nps-survey__stay-title').text('Stay updated');
            $('.nps-survey__stay-subtitle').text('Subscribe to our telegram channel');
            $('.nps-survey__stay-subscribe').text('Subscribe');

            //CONTROLS
            $('.btn-prev').text('Back');
            $('.btn-next').text('Next');
            $('.btn-submit').text('Send opinion');
            $('#info-step').text('step');
            $('#info-total').text('of');

            //PROGRESS
            $('.nps-survey__inscription').text('Progress');
            $('.nps-survey__title').text('Service rating');
        }
    }

    translateToEng();
    


    let currentStep = 1;
    let surveyCounter = 0;
    let surveyTotal = 0;
    const surveyCountArr = [10, 10, 10, 10, 10, 9, 8, 6, 10, 10, 6, 1];
    let isError = false;
    

    const stepsArr = ['#step1', '#step2', '#step3', '#step4'];

    function fillCheck() {
        $(stepsArr[currentStep - 1] + ' .nps-survey__grade').each(function(index, item) {
            if (!$(item).hasClass('checked')) {
                $(item).addClass('error');
                isError = true;
            }
        });
    }
    
    function nextStep() {

        fillCheck();

        if (isError == false) {

            $(stepsArr[currentStep - 1]).addClass('hidden');
            currentStep += 1;
            $(stepsArr[currentStep - 1]).removeClass('hidden');
        
            if (currentStep > 1) {
                if ($('.btn-prev').hasClass('hidden')) {
                    $('.btn-prev').removeClass('hidden');
                }
            }

            $('#step-num').text(currentStep);

            if (currentStep > 2) {
                $('.btn-next').addClass('hidden');
                $('.btn-submit').removeClass('hidden');
            }

            if (currentStep > 3) {
                 $('.nps-survey__controls').addClass('hidden');
                 updatePercent();
            }

            $('.nps-survey').scrollTop(0);
            $(window).scrollTop(0);

        }
    }

    function prevStep() {
        $(stepsArr[currentStep - 1]).addClass('hidden');
        currentStep -= 1;
        $(stepsArr[currentStep - 1]).removeClass('hidden');

        $('#step-num').text(currentStep);

        if (currentStep < 3) {
            $('.btn-submit').addClass('hidden');
            $('.btn-next').removeClass('hidden');
        }

        if (currentStep < 2) {
            $('.btn-prev').addClass('hidden');
        }

        $('.nps-survey').scrollTop(0);
        $(window).scrollTop(0);
    }

    function updatePercent() {
        let target = surveyCountArr[surveyCounter] + surveyTotal;
        const backgroundMobArr = document.querySelectorAll('.nps-survey__background-mob');
        const backgroundArr = document.querySelectorAll('.nps-survey__background');

        backgroundArr[12 - surveyCounter].style.visibility = 'hidden';
        backgroundMobArr[12 - surveyCounter].style.visibility = 'hidden';
       
        let timerId = setInterval(function() {
            if (surveyTotal !== target && surveyTotal < 100) {
                surveyTotal += 1;
                $('#percent').text(surveyTotal);
                $('#percent-mob').text(surveyTotal);
            } else {
                clearInterval(timerId);
                surveyCounter++;
            }
        }, 40);

    }

    const gradesArr = 
    [
        '#team-speed',
        '#team-communication',
        '#team-professionalism',
        '#team-work',
        '#task-grade',
        '#task-time',
        '#presentations',
        '#manager-job',
        '#quality',
        '#chance-reference',
        '#contact-again'
    ];

    $.each(gradesArr, function(index, value) {
        $(value + ' .nps-survey__grade-value').hover(function() {
            if (!$(value).hasClass('checked')) {
                
                var current = $(this);
                var prevAll = $(this).prevAll();
   
                var className = '';
                if (current.hasClass('very-much-bad')) {
                    className = 'very-much-bad-hover'; 
                }
                if (current.hasClass('very-bad')) {
                    className = 'very-bad-hover'; 
                }
                if (current.hasClass('bad')) {
                    className = 'bad-hover'; 
                }
                if (current.hasClass('normal')) {
                    className = 'normal-hover'; 
                }
                if (current.hasClass('good')) {
                    className = 'good-hover'; 
                }

                current.addClass(className);
                prevAll.addClass(className);
            }
        },
            function() {
                if (!$(value).hasClass('checked')) {
                    var current = $(this);
                    var prevAll = $(this).prevAll();

                    current.removeClass('very-much-bad-hover very-bad-hover bad-hover normal-hover good-hover');
                    prevAll.removeClass('very-much-bad-hover very-bad-hover bad-hover normal-hover good-hover');
                }
            }
        );

        $(value + ' .nps-survey__grade-value').click(function() {

            if ($(value).hasClass('checked')) {
                var current = $(this);
                var prevAll = $(this).prevAll();

                $(value + ' .nps-survey__grade-value').each(function(index, item) {
                    $(item).removeClass('very-much-bad-hover very-bad-hover bad-hover normal-hover good-hover');
                });
   
                var className = '';
                if (current.hasClass('very-much-bad')) {
                    className = 'very-much-bad-hover'; 
                }
                if (current.hasClass('very-bad')) {
                    className = 'very-bad-hover';
                }
                if (current.hasClass('bad')) {
                    className = 'bad-hover';
                }
                if (current.hasClass('normal')) {
                    className = 'normal-hover';
                }
                if (current.hasClass('good')) {
                    className = 'good-hover';
                }

                current.addClass(className);
                prevAll.addClass(className);

            } else {
                if ($(value).hasClass('error')) {
                    $(value).removeClass('error');
                    isError = false;
                } 
                $(value).addClass('checked');
                updatePercent(); 
            }

            // Отображение текста оценки
            switch ($(this).text()) {
                case '1':
                    if (value == '#chance-reference' || value == '#contact-again') {
                        
                        if (lang == 'en' || lang == 'EN') {
                            $(value + ' .nps-survey__grade-text').text('Never');
                        } else {
                            $(value + ' .nps-survey__grade-text').text('Никогда');
                        }
                        
                    } else {
                        if (lang == 'en' || lang == 'EN') {
                            $(value + ' .nps-survey__grade-text').text('Very bad');
                        } else {
                            $(value + ' .nps-survey__grade-text').text('Очень плохо');
                        }
                    }
                    break;
                case '2':
                    if (value == '#chance-reference' || value == '#contact-again') {
                        
                        if (lang == 'en' || lang == 'EN') {
                            $(value + ' .nps-survey__grade-text').text('No');
                        } else {
                            $(value + ' .nps-survey__grade-text').text('Нет');
                        }
                        
                    } else {
                        if (lang == 'en' || lang == 'EN') {
                            $(value + ' .nps-survey__grade-text').text('Bad');
                        } else {
                            $(value + ' .nps-survey__grade-text').text('Плохо');
                        }
                    }
                    break;
                case '3':
                    if (value == '#chance-reference' || value == '#contact-again') {
                        
                        if (lang == 'en' || lang == 'EN') {
                            $(value + ' .nps-survey__grade-text').text('Hardly');
                        } else {
                            $(value + ' .nps-survey__grade-text').text('Вряд ли');
                        }
                        
                    } else {
                        if (lang == 'en' || lang == 'EN') {
                            $(value + ' .nps-survey__grade-text').text('Satisfactorily');
                        } else {
                            $(value + ' .nps-survey__grade-text').text('Удовлетворительно');
                        }
                    }
                    break;
                case '4':
                    if (value == '#chance-reference' || value == '#contact-again') {
                        if (lang == 'en' || lang == 'EN') {
                            $(value + ' .nps-survey__grade-text').text('Most likely not');
                        } else {
                            $(value + ' .nps-survey__grade-text').text('Cкорее всего, нет');
                        }
                        
                    } else {
                        
                        if (lang == 'en' || lang == 'EN') {
                            $(value + ' .nps-survey__grade-text').text('Good');
                        } else {
                            $(value + ' .nps-survey__grade-text').text('Хорошо');
                        }
                        
                    }
                    break;
                case '5':
                    if (value == '#chance-reference' || value == '#contact-again') {
                        
                        if (lang == 'en' || lang == 'EN') {
                            $(value + ' .nps-survey__grade-text').text('Not sure');
                        } else {
                            $(value + ' .nps-survey__grade-text').text('Не уверен');
                        }
                        
                    } else {
                        if (lang == 'en' || lang == 'EN') {
                            $(value + ' .nps-survey__grade-text').text('Very good');
                        } else {
                            $(value + ' .nps-survey__grade-text').text('Очень хорошо');
                        }
                        
                    }
                    break;
                case '6':
                    if (value == '#chance-reference' || value == '#contact-again') {
                        
                        if (lang == 'en' || lang == 'EN') {
                            $(value + ' .nps-survey__grade-text').text('Unlikely');
                        } else {
                            $(value + ' .nps-survey__grade-text').text('Маловероятно');
                        }
                        
                    }
                    break;
                case '7':
                    if (value == '#chance-reference' || value == '#contact-again') {
                        if (lang == 'en' || lang == 'EN') {
                            $(value + ' .nps-survey__grade-text').text('Likely');
                        } else {
                            $(value + ' .nps-survey__grade-text').text('Вероятно');
                        }
                        
                    }
                    break;
                case '8':
                    if (value == '#chance-reference' || value == '#contact-again') {
                        if (lang == 'en' || lang == 'EN') {
                            $(value + ' .nps-survey__grade-text').text('Most likely yes');
                        } else {
                            $(value + ' .nps-survey__grade-text').text('Скорее всего, да');
                        }
                        
                    }
                    break;
                case '9':
                    if (value == '#chance-reference') {
                        if (lang == 'en' || lang == 'EN') {
                            $(value + ' .nps-survey__grade-text').text('I recommend');
                        } else {
                            $(value + ' .nps-survey__grade-text').text('Порекомендую');
                        }
                        
                    } else if (value == '#contact-again') {
                        if (lang == 'en' || lang == 'EN') {
                            $(value + ' .nps-survey__grade-text').text('I will contact you');
                        } else {
                            $(value + ' .nps-survey__grade-text').text('Обращусь');
                        }
                        
                    }
                    break;
                case '10':
                    if (value == '#chance-reference') {
                        if (lang == 'en' || lang == 'EN') {
                            $(value + ' .nps-survey__grade-text').text('I would definitely recommend');
                        } else {
                            $(value + ' .nps-survey__grade-text').text('Однозначно порекомендую');
                        }
                        
                    } else if (value == '#contact-again') {
                        if (lang == 'en' || lang == 'EN') {
                            $(value + ' .nps-survey__grade-text').text('I will definitely contact you');
                        } else {
                            $(value + ' .nps-survey__grade-text').text('Однозначно обращусь');
                        }
                        
                    }
                    break;                               
            }

            $(value + ' .nps-survey__grade-text').addClass('show');
            $(value + '-nps').val($(this).text());
        });
    });

    //switch steps
    $('.btn-next').click(function() {
        nextStep();
    });

    $('.btn-submit').click(function() {
        $('#survey-comment-nps').val($('#comment').val());

        //submit
        if (isError == false) {
            $('form').submit(function(event) {
                event.preventDefault();
                let form_data = $(this).serialize();
                $.ajax({
                    type: "GET", 
                    url: "/",
                    data: form_data,
                    success: function() {
                        console.log('Отправлено!');
                    }
                });
            });
        }

        nextStep();
    });

    $('.btn-prev').click(function() {
        prevStep();
    });

    //change submit btn text

    if (window.innerWidth < 1024) {
        if (lang == 'en' || lang == 'EN') {
            $('.btn-submit').text('Send');
        } else {
            $('.btn-submit').text('Отправить');
        } 
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth < 1024) {
            if (lang == 'en' || lang == 'EN') {
                $('.btn-submit').text('Send');
            } else {
                $('.btn-submit').text('Отправить');
            } 
        }
    })


    

    



 



});
