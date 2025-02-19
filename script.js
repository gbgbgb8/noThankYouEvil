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

// Event listeners for dynamic updates
document.getElementById('noun').addEventListener('change', updateCharacterSheet);
document.getElementById('adjective').addEventListener('change', updateCharacterSheet);
document.getElementById('companion_type').addEventListener('change', updateCharacterSheet);
document.getElementById('name').addEventListener('input', updateCharacterSheet);
document.getElementById('companion_name').addEventListener('input', updateCharacterSheet);

// Function to update the character sheet
function updateCharacterSheet() {
    const name = document.getElementById('name').value || 'Unnamed Character';
    const noun = document.getElementById('noun').value;
    const adjective = document.getElementById('adjective').value;
    const companionType = document.getElementById('companion_type').value;
    const companionName = document.getElementById('companion_name').value || 'Unnamed Companion';

    // Only update if required selections are made
    if (noun && adjective && companionType) {
        // Calculate pools
        const basePools = { ...nouns[noun].pools };
        const bonusPool = adjectives[adjective].pool;
        basePools[bonusPool] += adjectives[adjective].bonus;

        // Update display
        document.getElementById('display_name').textContent = name;
        document.getElementById('display_type').textContent = `${adjective.replace('_', ' ')} ${noun}`;
        document.getElementById('display_tough').textContent = basePools.tough;
        document.getElementById('display_fast').textContent = basePools.fast;
        document.getElementById('display_smart').textContent = basePools.smart;
        document.getElementById('display_awesome').textContent = basePools.awesome;
        document.getElementById('display_defense').textContent = nouns[noun].defense;
        document.getElementById('display_knack').textContent = nouns[noun].knack;
        document.getElementById('display_companion').textContent = companionName;
        document.getElementById('display_companion_type').textContent = companionType.replace('_', ' ');
        document.getElementById('display_cypher').textContent = companions[companionType].cypher;
    }
}

// Initial call to set default display
updateCharacterSheet();