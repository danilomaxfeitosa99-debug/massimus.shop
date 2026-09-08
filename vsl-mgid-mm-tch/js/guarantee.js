const guarantee = document.querySelectorAll("#guarantee");

// Set guarantee days
const guaranteeDays = "60";

// Content for the guarantee section
const guaranteeText = {

    "guaranteeTitle": `100% Satisfaction or Your Money Back <br class="d-none d-md-block"><span>${guaranteeDays}-Day Guarantee</span>`,

    "guaranteeContent":`We’re confident that NerveFlow can be a valuable part of your health journey, which is why we offer a 100% satisfaction guarantee for ${guaranteeDays} days. Start using it as soon as it arrives, and as you incorporate it into your daily routine, you may begin to feel more balanced and energized. Over time, you could notice small, positive changes in your overall wellness, like feeling lighter, more at ease, and more focused on your goals. This is an excellent opportunity to monitor how your body responds and celebrate any improvements along the way. If, after several weeks or months, you find that NerveFlow isn’t the right fit for you, we’ll gladly provide a full refund—no questions asked. With NerveFlow, you can explore a natural approach to supporting your health, completely risk-free.`,

}

guarantee.forEach(function(e) {

	// Build the HTML for the product item
	e.innerHTML = `
		<div class="container position-relative py-5">
			<div class="row align-items-center justify-content-center">
				<div class="col-12 col-md-3 text-center">
					<figure><img src="${assetsPath}assets/main/guarantee/img/guarantee-badge.webp" alt="Guarantee" class="mb-3"></figure>
				</div>
				<div class="col-12 col-md-9">
					<h2 class="fs-3 mb-3">${guaranteeText.guaranteeTitle}</h2>
					<p class="m-0">${guaranteeText.guaranteeContent}</p>
					<div class="d-flex gap-2 flex-wrap align-items-center justify-content-center mt-4 badges">
						<figure><img src="${assetsPath}assets/main/guarantee/img/gmp.png" alt="Badge"></figure>
						<figure><img src="${assetsPath}assets/main/guarantee/img/fda.png" alt="Badge"></figure>
						<figure><img src="${assetsPath}assets/main/guarantee/img/nat.png" alt="Badge"></figure>
						<figure><img src="${assetsPath}assets/main/guarantee/img/foreign.png" alt="Badge"></figure>
						<figure><img src="${assetsPath}assets/main/guarantee/img/gmo.png" alt="Badge"></figure>
					</div>
				</div>
			</div>
		</div>
		`
	;
});