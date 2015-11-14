// Runs if variable ASSETS exists
if(ASSETS){
		
		// get the container
		var $container = $('#thumbs');
		var $quiz = $('#quizOverlay');
		// generate the quiz for each assets
    ASSETS.forEach(function(quiz){
       
				// generate the thumbnail
        var $thumbs = $('<div/>').addClass('thumb blur').css('background-image', 'url("'+quiz.thumb+'")');
				$container.append($thumbs);
        // add event to the thumbnail, on click will trigger the quiz
				$thumbs.on('click', function(){
						openQuiz(quiz);
				});
    });
		
		function openQuiz(quiz){
				// open the overlay
				$quiz.stop().fadeIn(200);
				$quiz.children('.hint').text('Monggo ditebak siapa yang di foto ini?');
				$quiz.children('.thumb').html('').addClass('blur').append( $('<img/>').attr('src', quiz.thumb) );
				$quiz.children('.question').text(quiz.question);
				// generate the answer boxes
				$quiz.find('.answer form').html('');
				quiz.answer.split('').forEach(function(char){
						var input_box;
						if(char.trim()){
								input_box = $('<input/>').attr({'data-answer':char, 'name': 'answer[]', 'maxlength':1, 'required':1 }).on('input', validateInput);
						}else{
								input_box = $('<span/>');
						}
						$quiz.find('.answer form').append(input_box);
				});
				
				$quiz.children('.testimonial').hide().text(quiz.testimonial);
		};
		
		function closeQuiz(){
				$quiz.stop().fadeOut(200);
		}
		$('#closeOverlay').click(closeQuiz);
		
		function validateInput(e){
				// Go to next input box, until the last
				var $input = $(this);
				var $next = $input.next();
				// If it is the last one, gather the answer and check the answer.
				// if there is still empty boxes, focus on it.
				var wrong = 0;
				var is_valid = true;
				$quiz.find('.answer form input').each(function(){
						var answer = $(this).val().toLowerCase();
						if(!answer){
								$(this)[0].focus();
								$(this)[0].select();
								is_valid = false;
								return false;
						}else{
								var correct_answer = $(this).attr('data-answer').toLowerCase();
								if(correct_answer != answer){
										wrong++;
								}
						}
				});

				if(is_valid){						
						if(wrong){
								$quiz.children('.hint').text('Sorry masih ada salah '+wrong+' karakter. Hayooo?');
						}else{
								$quiz.children('.hint').text('Horee benar!!');
								$quiz.children('.testimonial').show();
								$quiz.children('.thumb').removeClass('blur');
						}
				}				
		}
    
    
}