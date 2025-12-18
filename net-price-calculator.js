(() => {
  const form = document.querySelector('#netPriceForm');
  if (!form) return;

  const defaults = {
    slider: { min: 1, max: 12, default: 6, ticks: [1, 3, 6, 9, 12] },
    bookCostPerCourse: 90,
    tuitionRates: {
      online: 372,
      inseat: { instate: 372, outstate: 690 },
    },
    programFeeRates: { edu: 15, bus: 20, nur: 125, other: 0 },
  };

  const externalConfig = window.netPriceConfig || {};
  const mergedSlider = { ...defaults.slider, ...(externalConfig.slider || {}) };
  const mergedTuition = {
    ...defaults.tuitionRates,
    ...(externalConfig.tuitionRates || {}),
    inseat: {
      ...defaults.tuitionRates.inseat,
      ...((externalConfig.tuitionRates && externalConfig.tuitionRates.inseat) || {}),
    },
  };
  const mergedProgramFees = {
    ...defaults.programFeeRates,
    ...(externalConfig.programFeeRates || {}),
  };
  const bookCostPerCourse = externalConfig.bookCostPerCourse ?? defaults.bookCostPerCourse;

  const residencyGroup = form.querySelector('[data-residency]');
  const creditSlider = form.querySelector('#creditHours');
  const creditDisplay = form.querySelector('[data-credit-display]');
  const courseDisplay = form.querySelector('[data-course-count]');
  const formNote = form.querySelector('[data-form-note]');
  const periodButtons = document.querySelectorAll('[data-period]');
  const scale = form.querySelector('[data-scale]');

  const tuitionRateEl = document.querySelector('[data-result="tuitionRate"]');
  const tuitionCostEl = document.querySelector('[data-result="tuitionCost"]');
  const programFeesEl = document.querySelector('[data-result="programFees"]');
  const booksCostEl = document.querySelector('[data-result="booksCost"]');
  const numCoursesEl = document.querySelector('[data-result="numCourses"]');
  const totalCostEl = document.querySelector('[data-result="totalCost"]');

  if (mergedSlider.min !== undefined) creditSlider.min = mergedSlider.min;
  if (mergedSlider.max !== undefined) creditSlider.max = mergedSlider.max;
  if (mergedSlider.default !== undefined) creditSlider.value = mergedSlider.default;

  const sliderMin = Number(creditSlider.min) || defaults.slider.min;
  const sliderMax = Number(creditSlider.max) || defaults.slider.max;
  const clampedDefault = Math.min(sliderMax, Math.max(sliderMin, Number(creditSlider.value) || sliderMin));
  creditSlider.value = clampedDefault;

  if (scale && Array.isArray(mergedSlider.ticks) && mergedSlider.ticks.length) {
    scale.innerHTML = '';
    mergedSlider.ticks.forEach((tick) => {
      const span = document.createElement('span');
      span.dataset.tickValue = tick;
      span.textContent = tick;
      scale.appendChild(span);
    });
  }

  const tickLabels = form.querySelectorAll('[data-tick-value]');
  function positionTicks() {
    if (!tickLabels.length) return;
    tickLabels.forEach((label) => {
      const value = Number(label.dataset.tickValue);
      const percent = ((value - sliderMin) / (sliderMax - sliderMin)) * 100;
      let transform = 'translateX(-50%)';
      if (percent <= 0) {
        transform = 'translateX(0)';
      } else if (percent >= 100) {
        transform = 'translateX(-100%)';
      }
      label.style.left = `${percent}%`;
      label.style.transform = transform;
    });
  }

  const tuitionRates = mergedTuition;
  const programFeeRates = mergedProgramFees;

  let currentPeriod = 'semester';
  let lastCalculation = null;

  function formatCurrency(value) {
    return `$${Number(value).toLocaleString()}`;
  }

  function showResidencyGroup(show) {
    residencyGroup.hidden = !show;
    if (!show) {
      residencyGroup.querySelectorAll('input[type="radio"]').forEach((input) => {
        input.checked = false;
        input.closest('.choice')?.classList.remove('is-active');
      });
    }
  }

  function handleChoiceState(input) {
    const choice = input.closest('.choice');
    const siblings = choice?.parentElement?.querySelectorAll('.choice');
    siblings?.forEach((item) => item.classList.remove('is-active'));
    choice?.classList.add('is-active');

    if (input.name === 'enrollmentType') {
      showResidencyGroup(input.value === 'inseat');
    }
  }

  function updateRangeUI(value) {
    const hours = Number(value);
    creditDisplay.textContent = hours;
    const courses = Math.max(1, Math.ceil(hours / 3));
    courseDisplay.textContent = courses;

    const percentage = ((hours - sliderMin) / (sliderMax - sliderMin)) * 100;
    creditSlider.style.background = `linear-gradient(to right, #c6b66d 0%, #c6b66d ${percentage}%, #e5e8ed ${percentage}%, #e5e8ed 100%)`;
  }

  function readForm() {
    const enrollmentType = form.querySelector('input[name="enrollmentType"]:checked')?.value;
    const residency = form.querySelector('input[name="residency"]:checked')?.value;
    const program = form.querySelector('#program').value;
    const creditHours = Number(creditSlider.value);

    return { enrollmentType, residency, program, creditHours };
  }

  function validate(values) {
    if (!values.enrollmentType) return 'Select your enrollment type.';
    if (values.enrollmentType === 'inseat' && !values.residency) return 'Choose a residency option.';
    if (!values.program) return 'Pick a graduate program to continue.';
    if (!values.creditHours || values.creditHours < sliderMin || values.creditHours > sliderMax) {
      return `Credit hours must be between ${sliderMin} and ${sliderMax}.`;
    }
    return '';
  }

  function getProgramPrefix(program) {
    return program.split('-')[0] || 'other';
  }

  function calculate(values) {
    const tuitionRate =
      values.enrollmentType === 'online'
        ? tuitionRates.online
        : tuitionRates.inseat[values.residency];

    const programPrefix = getProgramPrefix(values.program);
    const programRate = programFeeRates[programPrefix] ?? 0;

    const tuitionCost = tuitionRate * values.creditHours;
    const programFees = programRate * values.creditHours;
    const numCourses = Math.ceil(values.creditHours / 3);
    const booksCost = numCourses * bookCostPerCourse;
    const totalCost = tuitionCost + programFees + booksCost;

    return {
      tuitionRate,
      tuitionCost,
      programFees,
      booksCost,
      numCourses,
      totalCost,
    };
  }

  function render(calculation) {
    const multiplier = currentPeriod === 'year' ? 2 : 1;

    tuitionRateEl.textContent = formatCurrency(calculation.tuitionRate);
    tuitionCostEl.textContent = formatCurrency(calculation.tuitionCost * multiplier);
    programFeesEl.textContent = formatCurrency(calculation.programFees * multiplier);
    booksCostEl.textContent = formatCurrency(calculation.booksCost * multiplier);
    numCoursesEl.textContent = `${calculation.numCourses * multiplier}`;
    totalCostEl.textContent = formatCurrency(calculation.totalCost * multiplier);
  }

  function handleSubmit(event) {
    event.preventDefault();
    formNote.textContent = '';

    const values = readForm();
    const error = validate(values);
    if (error) {
      formNote.textContent = error;
      return;
    }

    lastCalculation = calculate(values);
    render(lastCalculation);
  }

  function bindEvents() {
    form.querySelectorAll('.choice input').forEach((input) => {
      input.addEventListener('change', () => handleChoiceState(input));
    });

    creditSlider.addEventListener('input', (event) => updateRangeUI(event.target.value));
    positionTicks();
    updateRangeUI(creditSlider.value);

    periodButtons.forEach((button) => {
      button.addEventListener('click', () => {
        periodButtons.forEach((btn) => btn.classList.remove('is-active'));
        button.classList.add('is-active');
        currentPeriod = button.dataset.period;
        if (lastCalculation) render(lastCalculation);
      });
    });

    form.addEventListener('submit', handleSubmit);
  }

  bindEvents();
})();
