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
    companionName: document.getElementById('companion_name'),
    customNoun: document.getElementById('custom_noun'),
    customAdjective: document.getElementById('custom_adjective'),
    customCompanionType: document.getElementById('custom_companion_type')
};

// Add image-related elements
const imageElements = {
    container: document.querySelector('.character-image-container'),
    input: document.getElementById('character-image'),
    preview: document.querySelector('.image-preview'),
    img: document.getElementById('character-art'),
    removeButton: document.querySelector('.remove-image-button')
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

// Handle image upload
imageElements.input.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageElements.img.src = e.target.result;
            imageElements.preview.style.display = 'block';
            imageElements.input.parentElement.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

// Handle image removal
imageElements.removeButton.addEventListener('click', function() {
    imageElements.img.src = '';
    imageElements.preview.style.display = 'none';
    imageElements.input.parentElement.style.display = 'block';
    imageElements.input.value = '';
});

// Handle custom input visibility
function setupCustomInputs() {
    const toggleCustomInput = (select, customInput) => {
        const customContainer = customInput.parentElement;
        if (select.value === 'custom') {
            customContainer.style.display = 'block';
            customContainer.classList.add('visible');
            customInput.required = true;
        } else {
            customContainer.style.display = 'none';
            customContainer.classList.remove('visible');
            customInput.required = false;
            customInput.value = '';
        }
    };

    form.noun.addEventListener('change', () => toggleCustomInput(form.noun, form.customNoun));
    form.adjective.addEventListener('change', () => toggleCustomInput(form.adjective, form.customAdjective));
    form.companionType.addEventListener('change', () => toggleCustomInput(form.companionType, form.customCompanionType));
}

setupCustomInputs();

// Get actual value (custom or selected)
function getFieldValue(selectElement, customElement) {
    if (selectElement.value === 'custom') {
        return customElement.value.trim();
    }
    return selectElement.value;
}

// Modified validate form to handle custom inputs
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

    const nounValue = getFieldValue(form.noun, form.customNoun);
    if (!nounValue) {
        isValid = false;
        errors.push('Please select or enter a noun');
        form.noun.classList.add('error');
        if (form.noun.value === 'custom') {
            form.customNoun.classList.add('error');
        }
    } else {
        form.noun.classList.remove('error');
        form.customNoun.classList.remove('error');
    }

    const adjectiveValue = getFieldValue(form.adjective, form.customAdjective);
    if (!adjectiveValue) {
        isValid = false;
        errors.push('Please select or enter an adjective');
        form.adjective.classList.add('error');
        if (form.adjective.value === 'custom') {
            form.customAdjective.classList.add('error');
        }
    } else {
        form.adjective.classList.remove('error');
        form.customAdjective.classList.remove('error');
    }

    const companionTypeValue = getFieldValue(form.companionType, form.customCompanionType);
    if (!companionTypeValue) {
        isValid = false;
        errors.push('Please select or enter a companion type');
        form.companionType.classList.add('error');
        if (form.companionType.value === 'custom') {
            form.customCompanionType.classList.add('error');
        }
    } else {
        form.companionType.classList.remove('error');
        form.customCompanionType.classList.remove('error');
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

// Modified handle submit to include background generation
function handleSubmit(event) {
    event.preventDefault();
    const { isValid, errors } = validateForm();
    
    if (isValid) {
        updateCharacterSheet(true);
        // Generate background automatically on save
        generateCharacterBackground(false);
    } else {
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

// Modified update character sheet to handle custom values
function updateCharacterSheet(showNotification = false) {
    const name = form.name.value.trim() || 'Unnamed Character';
    const noun = getFieldValue(form.noun, form.customNoun);
    const adjective = getFieldValue(form.adjective, form.customAdjective);
    const companionType = getFieldValue(form.companionType, form.customCompanionType);
    const companionName = form.companionName.value.trim() || 'Unnamed Companion';

    // Show loading state
    document.querySelector('.sheet-container').classList.add('loading');

    // Simulate a brief loading delay for better UX
    setTimeout(() => {
        if (noun && adjective && companionType) {
            // Handle custom values for pools and abilities
            const characterPools = nouns[noun]?.pools || {
                tough: 1,
                fast: 1,
                smart: 1,
                awesome: 1
            };

            const adjectiveBonus = adjectives[adjective] || {
                pool: 'awesome',
                bonus: 1
            };

            const companionAbility = companions[companionType]?.cypher || 
                `Special Ability: Your companion has unique powers that help you on your adventures.`;

            // Update display with animations
            updateDisplayField('display_name', name);
            updateDisplayField('display_type', `${adjective.replace('_', ' ')} ${noun}`);
            updateDisplayField('display_tough', characterPools.tough);
            updateDisplayField('display_fast', characterPools.fast);
            updateDisplayField('display_smart', characterPools.smart);
            updateDisplayField('display_awesome', characterPools.awesome);
            updateDisplayField('display_defense', nouns[noun]?.defense || 'Uses their unique abilities to defend');
            updateDisplayField('display_knack', nouns[noun]?.knack || 'Has special talents waiting to be discovered');
            updateDisplayField('display_companion', companionName);
            updateDisplayField('display_companion_type', companionType.replace(/_/g, ' '));
            updateDisplayField('display_cypher', companionAbility);

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

// Generate AI prompt based on character details
function generateAIPrompt() {
    const name = form.name.value.trim() || 'Unnamed Character';
    const noun = getFieldValue(form.noun, form.customNoun);
    const adjective = getFieldValue(form.adjective, form.customAdjective);
    const companionType = getFieldValue(form.companionType, form.customCompanionType);
    const companionName = form.companionName.value.trim() || 'Unnamed Companion';
    const background = document.getElementById('display_background').textContent;

    if (!noun || !adjective || !companionType) {
        Swal.fire({
            title: 'Incomplete Character',
            text: 'Please fill in the character details first!',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return null;
    }

    // Build a detailed prompt for AI image generation
    const characterDescription = `${adjective.replace(/_/g, ' ')} ${noun}`;
    const companionDescription = companionType.replace(/_/g, ' ');
    
    // Create a rich description based on the character type
    let styleDetails = '';
    
    // Check predefined types first
    if (nouns[noun]) {
        if (noun === 'wizard') {
            styleDetails = 'magical, mystical, with glowing magical effects';
        } else if (noun === 'superhero') {
            styleDetails = 'dynamic pose, heroic lighting, comic book style';
        } else if (noun === 'robot') {
            styleDetails = 'metallic textures, glowing elements, sci-fi style';
        } else if (noun === 'pirate') {
            styleDetails = 'swashbuckling adventure style, dramatic lighting';
        } else if (noun === 'princess') {
            styleDetails = 'royal attire, elegant pose, fantasy style';
        } else if (noun === 'astronaut') {
            styleDetails = 'space background, futuristic suit, sci-fi elements';
        }
    } else {
        // Generate style details based on adjective and noun combination
        const moodWords = {
            cool: 'relaxed and confident',
            fantastic: 'magical and extraordinary',
            fast: 'dynamic and energetic',
            kind: 'warm and welcoming',
            powerful: 'strong and impressive',
            sneaky: 'mysterious and clever',
            super_smart: 'intelligent and focused',
            super_strong: 'mighty and heroic'
        };

        // Get mood from adjective or generate one for custom adjectives
        const mood = adjectives[adjective] ? 
            moodWords[adjective] : 
            `${adjective.toLowerCase()} and distinctive`;

        // Create style details for custom character types
        styleDetails = `${mood} pose, with details that highlight their unique ${noun.toLowerCase()} nature`;
    }

    // Add companion-specific details
    let companionStyle = '';
    if (companions[companionType]) {
        // Use predefined companion descriptions
        if (companionType.includes('dragon')) {
            companionStyle = 'with scales that shimmer and magical energy swirling around them';
        } else if (companionType.includes('ghost')) {
            companionStyle = 'semi-transparent and glowing with a gentle, friendly aura';
        } else if (companionType.includes('robot')) {
            companionStyle = 'with shiny metal parts and blinking lights';
        } else if (companionType.includes('monster')) {
            companionStyle = 'looking fierce but friendly, with a big heart';
        } else if (companionType.includes('alien')) {
            companionStyle = 'with unique otherworldly features that seem both exotic and endearing';
        }
    } else {
        // Generate companion style for custom types
        companionStyle = `showing their unique characteristics as a ${companionDescription.toLowerCase()}`;
    }

    // Include background story in the scene description
    const backgroundContext = background && background !== 'Click generate to create a background story...' ?
        `The scene reflects their background: ${background}` :
        '';

    // Construct the prompt with all details
    const prompt = `A vibrant, detailed illustration of ${name}, a ${characterDescription}, ${styleDetails}. They are accompanied by their faithful companion ${companionName}, a ${companionDescription} ${companionStyle}. ${backgroundContext} Cute and child-friendly art style, suitable for a children's adventure game. Digital art, colorful, well-lit, playful atmosphere.`;

    return prompt;
}

// Modified copyAIPrompt to show image upload area
async function copyAIPrompt() {
    const prompt = generateAIPrompt();
    if (!prompt) return;

    try {
        await navigator.clipboard.writeText(prompt);
        // Show the image upload area
        imageElements.container.style.display = 'block';
        Swal.fire({
            title: 'Copied!',
            text: 'AI art prompt copied to clipboard. Once you generate your art, you can upload it to your character sheet!',
            icon: 'success',
            timer: 3000,
            showConfirmButton: false
        });
    } catch (err) {
        Swal.fire({
            title: 'Error',
            text: 'Failed to copy prompt to clipboard',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

// Character generation data
const backgroundData = {
    personalities: [
        'brave and adventurous',
        'curious and clever',
        'kind and helpful',
        'mischievous but lovable',
        'creative and imaginative',
        'determined and resourceful'
    ],
    origins: [
        'from a magical floating city',
        'raised in a secret laboratory',
        'born in a mystical forest',
        'from a family of famous adventurers',
        'discovered in a shooting star',
        'grew up in a traveling circus'
    ],
    quirks: [
        'always carries a lucky charm that glows in the dark',
        'can speak to friendly woodland creatures',
        'loves collecting unusual shiny objects',
        'tells jokes that make flowers giggle',
        'leaves a trail of sparkles when excited',
        'can make tiny rainbows appear'
    ],
    dreams: [
        'dreams of discovering all the world\'s mysteries',
        'hopes to make friends with every magical creature',
        'wants to build the most amazing inventions',
        'wishes to help others find their own adventures',
        'seeks to collect stories from every corner of the realm',
        'aims to become the greatest hero in the land'
    ]
};

// Add character-specific traits
const characterTraits = {
    wizard: {
        personalities: ['mystical and wise', 'eccentric but brilliant'],
        quirks: ['makes their wand do silly dances', 'turns accidents into butterflies']
    },
    superhero: {
        personalities: ['bold and courageous', 'humble yet powerful'],
        quirks: ['cape always flows in nonexistent wind', 'strikes heroic poses randomly']
    },
    robot: {
        personalities: ['logical yet caring', 'curious about human emotions'],
        quirks: ['beeps happily when pleased', 'processes feelings with colorful lights']
    },
    pirate: {
        personalities: ['swashbuckling and daring', 'treasure-hunting but generous'],
        quirks: ['has a map for everything', 'speaks in sea shanties']
    },
    princess: {
        personalities: ['graceful and diplomatic', 'adventurous despite royal duties'],
        quirks: ['crown doubles as a toolkit', 'teaches etiquette to dragons']
    },
    astronaut: {
        personalities: ['space-savvy and brave', 'scientific yet whimsical'],
        quirks: ['collects stardust in jars', 'names every asteroid they see']
    }
};

// Add more variety to background generation
const additionalBackgroundData = {
    personalities: [
        'always looking for new mysteries to solve',
        'loves making new friends wherever they go',
        'believes in the power of teamwork',
        'never gives up, no matter the challenge',
        'sees the magic in everyday things',
        'always ready for the next big adventure'
    ],
    origins: [
        'discovered in a rainbow after a storm',
        'emerged from a magical storybook',
        'arrived through a portal of dreams',
        'found in a garden of glowing flowers',
        'born during a meteor shower',
        'raised by friendly forest creatures'
    ],
    quirks: [
        'can make plants grow by singing to them',
        'their hair changes color with their mood',
        'leaves tiny footprints of stardust',
        'can understand cloud shapes as messages',
        'their laughter makes flowers bloom',
        'creates tiny illusions when excited'
    ],
    dreams: [
        'wants to paint the biggest rainbow ever seen',
        'hopes to teach dragons how to dance',
        'dreams of building bridges between worlds',
        'seeks to collect stories from the stars',
        'wishes to make everyone\'s dreams come true',
        'plans to discover new kinds of magic'
    ]
};

// Merge additional data with existing data
Object.keys(backgroundData).forEach(key => {
    backgroundData[key] = [...backgroundData[key], ...additionalBackgroundData[key]];
});

// Modified generate character background to handle custom types
function generateCharacterBackground(forceNewSeed = false) {
    const name = form.name.value.trim() || 'Unnamed Character';
    const noun = getFieldValue(form.noun, form.customNoun);
    const adjective = getFieldValue(form.adjective, form.customAdjective);
    const companionName = form.companionName.value.trim() || 'Unnamed Companion';
    const companionType = getFieldValue(form.companionType, form.customCompanionType);

    if (!noun || !adjective || !companionType) {
        Swal.fire({
            title: 'Incomplete Character',
            text: 'Please fill in the character details first!',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Create a random seed for each generation
    const seed = forceNewSeed ? Math.random().toString() : (name + noun + adjective + companionName);
    const rng = new Math.seedrandom(seed);
    const random = (arr) => arr[Math.floor(rng() * arr.length)];

    // Get character-specific traits if they exist, or generate generic ones
    const specificTraits = characterTraits[noun] || {
        personalities: [
            `${adjective.toLowerCase()} and mysterious`,
            `uniquely ${adjective.toLowerCase()}`
        ],
        quirks: [
            `has special ${noun.toLowerCase()}-like abilities`,
            `shows their ${adjective.toLowerCase()} nature in unexpected ways`
        ]
    };

    const personalityPool = [...backgroundData.personalities, ...(specificTraits.personalities || [])];
    const quirkPool = [...backgroundData.quirks, ...(specificTraits.quirks || [])];

    // Generate the background story
    const personality = random(personalityPool);
    const origin = random(backgroundData.origins);
    const quirk = random(quirkPool);
    const dream = random(backgroundData.dreams);

    const companionDesc = companionType.replace(/_/g, ' ');
    
    const story = `${name} is ${personality}, ${origin}. Together with their faithful companion ${companionName}, a ${companionDesc} who ${quirk}, they ${dream}.`;

    // Update the display with animation
    updateDisplayField('display_background', story);

    // Enable the regenerate button after first generation
    document.querySelector('.regenerate-button').disabled = false;

    // Show success notification
    Swal.fire({
        title: forceNewSeed ? 'Background Regenerated!' : 'Background Generated!',
        text: 'A new chapter in your character\'s story has been written.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
    });
}

// Set up button event listeners
document.querySelector('.print-button').onclick = printCharacterSheet;
document.querySelector('.ai-prompt-button').onclick = copyAIPrompt;
document.querySelector('.generate-button').onclick = () => generateCharacterBackground(false);
document.querySelector('.regenerate-button').onclick = () => generateCharacterBackground(true);

// Initial call to set default display
updateCharacterSheet();