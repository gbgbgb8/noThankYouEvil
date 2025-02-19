// Data definitions based on the Quick Players' Guide
const nouns = {
    astronaut: {
        pools: { tough: 2, fast: 2, smart: 3, awesome: 1 },
        defense: 'Armor',
        knack: 'Blastoff (costs 1 Fast): Your character can leap off the ground with ease.'
    },
    creature: {
        pools: { tough: 3, fast: 2, smart: 1, awesome: 2 },
        defense: 'Armor',
        knack: 'Rawr! (costs 1 Tough): Your character can frighten or intimidate any bad guy for one round.'
    },
    fighter: {
        pools: { tough: 3, fast: 1, smart: 1, awesome: 2 },
        defense: 'Armor',
        knack: 'Knockout (costs 1 Tough): When your character fights a hurt bad guy, if you yell "Knockout!" on your turn, the bad guy will lose their next turn.'
    },
    kid: {
        pools: { tough: 1, fast: 2, smart: 1, awesome: 2 },
        defense: 'Hustle',
        knack: 'Scramble (costs 1 Fast): Your character can jump, climb, or leap nearly any obstacle.'
    },
    pirate: {
        pools: { tough: 2, fast: 3, smart: 2, awesome: 1 },
        defense: 'Hustle',
        knack: 'Plunder (costs 1 Fast): Your character can open any locked treasure chest.'
    },
    princess: {
        pools: { tough: 2, fast: 1, smart: 2, awesome: 3 },
        defense: 'Hustle',
        knack: 'Charm (costs 1 Smart): Your character is so charismatic that they charm a bad guy into not attacking for one round.'
    },
    robot: {
        pools: { tough: 2, fast: 1, smart: 2, awesome: 1 },
        defense: 'Armor',
        knack: 'Solve (costs 1 Smart): Any time your character says "bleep bloop!" and tries to figure out the answer to a problem, they succeed.'
    },
    spy: {
        pools: { tough: 1, fast: 2, smart: 2, awesome: 1 },
        defense: 'Hustle',
        knack: 'Sneak (costs 1 Fast): When your character needs to remain unseen, they can easily fade away into the shadows.'
    },
    superhero: {
        pools: { tough: 3, fast: 2, smart: 1, awesome: 2 },
        defense: 'Armor',
        knack: 'Smash! (costs 1 Tough): When your character yells "I\'ll save the day!" they succeed at any non-fighting action.'
    },
    wizard: {
        pools: { tough: 1, fast: 3, smart: 2, awesome: 1 },
        defense: 'Hustle',
        knack: 'Ta-da! (costs 1 Smart): Your character casts a convincing illusion.'
    }
};

const adjectives = {
    cool: { pool: 'smart', bonus: 1 },
    fantastic: { pool: 'awesome', bonus: 1 },
    fast: { pool: 'fast', bonus: 1 },
    kind: { pool: 'awesome', bonus: 1 },
    powerful: { pool: 'tough', bonus: 1 },
    sneaky: { pool: 'fast', bonus: 1 },
    super_smart: { pool: 'smart', bonus: 1 },
    super_strong: { pool: 'tough', bonus: 1 }
};

const companions = {
    awesome_alien: { cypher: 'Lifesaver: When your character needs to roll for defense, your companion leaps in front of you and protects your character from all damage.' },
    big_bad_wolf: { cypher: 'Big Ears: They alert you any time there\'s something dangerous nearby.' },
    clumsy_ghost: { cypher: 'Spark: Shoots a bolt of lightning that does 3 points of damage to one bad guy.' },
    dust_bunny: { cypher: 'Lullaby: Sings a lullaby, putting all creatures who are close by to sleep for one round.' },
    fast_car: { cypher: 'Free Ride: Your companion zooms over and picks you up, protecting you from all damage.' },
    fiery_dragon: { cypher: 'Enflame: Your companion spits a gout of flame that does 2 points of damage to everything right next to them.' },
    flying_octopus: { cypher: 'Squeeze: Squishes and squeezes any object until it opens (especially good for treasure chests).' },
    invisible_friend: { cypher: 'No See \'Em: Your companion makes your whole group invisible.' },
    little_sibling: { cypher: 'Knock-Knock: Your companion tells a hilarious joke, and you add +2 to your Awesome pool.' },
    pretty_pony: { cypher: 'Best Buds: Your companion summons their whole herd, and they carry your whole group back to your home base.' },
    robot_dog: { cypher: 'Trickster: Your companion shows off a new trick that is so cool you immediately gain +2 to your Smart pool.' },
    scary_monster: { cypher: 'Startle: Your companion sneaks up behind a nearby bad guy and scares them so badly that they try to run away.' },
    tiny_t_rex: { cypher: 'Embiggen: Your companion suddenly grows to full T. Rex size and stomps on a bad guy or object, doing 3 points of damage.' }
};

// DOM Elements
const form = {
    element: document.getElementById('character-form'),
    name: document.getElementById('name'),
    noun: document.getElementById('noun'),
    adjective: document.getElementById('adjective'),
    companionType: document.getElementById('companion_type'),
    companionName: document.getElementById('companion_name')
};

// Event listeners for live preview updates
Object.values(form).forEach(element => {
    if (element !== form.element && (element.tagName === 'INPUT' || element.tagName === 'SELECT')) {
        element.addEventListener('input', updatePreview);
        element.addEventListener('change', updatePreview);
    }
});

// Form submission handler
form.element.addEventListener('submit', handleSubmit);

// Form validation
function validateForm() {
    let isValid = true;
    const errors = [];

    if (!form.name.value.trim()) {
        isValid = false;
        errors.push('Character name is required');
        form.name.classList.add('error');
    } else {
        form.name.classList.remove('error');
    }

    if (!form.noun.value) {
        isValid = false;
        errors.push('Please select a noun');
        form.noun.classList.add('error');
    } else {
        form.noun.classList.remove('error');
    }

    if (!form.adjective.value) {
        isValid = false;
        errors.push('Please select an adjective');
        form.adjective.classList.add('error');
    } else {
        form.adjective.classList.remove('error');
    }

    if (!form.companionType.value) {
        isValid = false;
        errors.push('Please select a companion type');
        form.companionType.classList.add('error');
    } else {
        form.companionType.classList.remove('error');
    }

    if (!form.companionName.value.trim()) {
        isValid = false;
        errors.push('Companion name is required');
        form.companionName.classList.add('error');
    } else {
        form.companionName.classList.remove('error');
    }

    return { isValid, errors };
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    const { isValid, errors } = validateForm();
    
    if (isValid) {
        updateCharacterSheet(true);
    } else {
        // Show errors using SweetAlert2
        Swal.fire({
            title: 'Please fix the following:',
            html: errors.join('<br>'),
            icon: 'warning',
            confirmButtonText: 'OK'
        });
    }
}

// Live preview update function (no validation)
function updatePreview() {
    updateCharacterSheet(false);
}

// Enhanced character sheet update function
function updateCharacterSheet(showNotification = false) {
    const name = form.name.value.trim() || 'Unnamed Character';
    const noun = form.noun.value;
    const adjective = form.adjective.value;
    const companionType = form.companionType.value;
    const companionName = form.companionName.value.trim() || 'Unnamed Companion';

    // Show loading state
    document.querySelector('.sheet-container').classList.add('loading');

    // Simulate a brief loading delay for better UX
    setTimeout(() => {
        if (noun && adjective && companionType) {
            // Calculate pools
            const basePools = { ...nouns[noun].pools };
            const bonusPool = adjectives[adjective].pool;
            basePools[bonusPool] += adjectives[adjective].bonus;

            // Update display with animations
            updateDisplayField('display_name', name);
            updateDisplayField('display_type', `${adjective.replace('_', ' ')} ${noun}`);
            updateDisplayField('display_tough', basePools.tough);
            updateDisplayField('display_fast', basePools.fast);
            updateDisplayField('display_smart', basePools.smart);
            updateDisplayField('display_awesome', basePools.awesome);
            updateDisplayField('display_defense', nouns[noun].defense);
            updateDisplayField('display_knack', nouns[noun].knack);
            updateDisplayField('display_companion', companionName);
            updateDisplayField('display_companion_type', companionType.replace('_', ' '));
            updateDisplayField('display_cypher', companions[companionType].cypher);

            // Show success message only on form submission
            if (showNotification) {
                Swal.fire({
                    title: 'Character Saved!',
                    text: `${name} is ready for adventure!`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        }

        // Remove loading state
        document.querySelector('.sheet-container').classList.remove('loading');
    }, 300);
}

// Helper function to update display fields with animation
function updateDisplayField(elementId, value) {
    const element = document.getElementById(elementId);
    if (element.textContent !== value.toString()) {
        element.classList.add('animate-fade-in');
        element.textContent = value;
        setTimeout(() => element.classList.remove('animate-fade-in'), 500);
    }
}

// Print character sheet
function printCharacterSheet() {
    window.print();
}

// Add print button
const printButton = document.createElement('button');
printButton.innerHTML = '<i class="fas fa-print"></i> Print Character Sheet';
printButton.className = 'print-button';
printButton.onclick = printCharacterSheet;
document.querySelector('.sheet-container').appendChild(printButton);

// Initial call to set default display
updateCharacterSheet();