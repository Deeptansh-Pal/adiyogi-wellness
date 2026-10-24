
/* ==========================================
   ADIYOGI WELLNESS
   Simple JavaScript for yoga poses and breathing
   ========================================== */

/* 1. Yoga poses ki list
   Har pose ke saath YouTube tutorial search link hai. */

const yogaPoses = [
    {
        name: "Mountain Pose",
        hindi: "Tadasana",
        benefit: "Helps improve posture and balance."
    },
    {
        name: "Tree Pose",
        hindi: "Vrikshasana",
        benefit: "Practises balance and concentration."
    },
    {
        name: "Child's Pose",
        hindi: "Balasana",
        benefit: "A gentle resting and relaxation pose."
    },
    {
        name: "Downward Facing Dog",
        hindi: "Adho Mukha Svanasana",
        benefit: "Stretches the body and shoulders."
    },
    {
        name: "Cobra Pose",
        hindi: "Bhujangasana",
        benefit: "Gently stretches the front of the body."
    },
    {
        name: "Warrior I",
        hindi: "Virabhadrasana I",
        benefit: "Practises strength and stability."
    },
    {
        name: "Warrior II",
        hindi: "Virabhadrasana II",
        benefit: "Builds balance and leg strength."
    },
    {
        name: "Triangle Pose",
        hindi: "Trikonasana",
        benefit: "Encourages balance and side-body stretching."
    },
    {
        name: "Chair Pose",
        hindi: "Utkatasana",
        benefit: "Practises balance and leg strength."
    },
    {
        name: "Bridge Pose",
        hindi: "Setu Bandhasana",
        benefit: "Gently strengthens the back and hips."
    },
    {
        name: "Boat Pose",
        hindi: "Navasana",
        benefit: "Practises core strength and balance."
    },
    {
        name: "Cat-Cow Pose",
        hindi: "Marjaryasana-Bitilasana",
        benefit: "Encourages gentle spinal movement."
    },
    {
        name: "Crescent Lunge",
        hindi: "Anjaneyasana",
        benefit: "Stretches the hips and thighs."
    },
    {
        name: "Seated Forward Bend",
        hindi: "Paschimottanasana",
        benefit: "Gently stretches the back of the body."
    },
    {
        name: "Butterfly Pose",
        hindi: "Baddha Konasana",
        benefit: "Encourages gentle hip stretching."
    },
    {
        name: "Lotus Pose",
        hindi: "Padmasana",
        benefit: "A traditional seated meditation posture."
    },
    {
        name: "Easy Pose",
        hindi: "Sukhasana",
        benefit: "Useful for comfortable seated breathing."
    },
    {
        name: "Corpse Pose",
        hindi: "Shavasana",
        benefit: "Promotes rest and relaxation."
    },
    {
        name: "Pigeon Pose",
        hindi: "Eka Pada Rajakapotasana",
        benefit: "Provides a hip stretch when performed gently."
    },
    {
        name: "Camel Pose",
        hindi: "Ustrasana",
        benefit: "Opens the chest and stretches the front body."
    },
    {
        name: "Bow Pose",
        hindi: "Dhanurasana",
        benefit: "Practises back extension and body control."
    },
    {
        name: "Plank Pose",
        hindi: "Phalakasana",
        benefit: "Practises core and shoulder stability."
    },
    {
        name: "Side Plank",
        hindi: "Vasisthasana",
        benefit: "Practises side-body strength and balance."
    },
    {
        name: "Happy Baby Pose",
        hindi: "Ananda Balasana",
        benefit: "Gently stretches the hips and back."
    },
    {
        name: "Eagle Pose",
        hindi: "Garudasana",
        benefit: "Practises balance and coordination."
    },
    {
        name: "Dancer Pose",
        hindi: "Natarajasana",
        benefit: "Practises balance and flexibility."
    },
    {
        name: "Half Moon Pose",
        hindi: "Ardha Chandrasana",
        benefit: "Practises balance and coordination."
    },
    {
        name: "Standing Forward Bend",
        hindi: "Uttanasana",
        benefit: "Gently stretches the back of the legs."
    },
    {
        name: "Sun Salutation",
        hindi: "Surya Namaskar",
        benefit: "A sequence combining several yoga postures."
    }
];


/* 2. Yoga poses ko webpage par show karna */

const poseGrid = document.getElementById("poseGrid");
const poseSearch = document.getElementById("poseSearch");
const noResults = document.getElementById("noResults");

// Pose cards banane ke liye function
function displayPoses(searchText = "") {
    poseGrid.innerHTML = "";

    // Search ko case-insensitive banaya gaya hai
    const filteredPoses = yogaPoses.filter(pose => {
        return (
            pose.name.toLowerCase().includes(searchText.toLowerCase()) ||
            pose.hindi.toLowerCase().includes(searchText.toLowerCase())
        );
    });

    // Agar search ka result nahi milta
    noResults.hidden = filteredPoses.length !== 0;

    // Har pose ka card create karna
    filteredPoses.forEach((pose) => {
        const card = document.createElement("div");
        card.className = "pose-card";

        const poseNumber = yogaPoses.indexOf(pose) + 1;

        // YouTube par us pose ka tutorial search hoga
        const youtubeLink =
            "https://www.youtube.com/results?search_query=" +
            encodeURIComponent(pose.name + " yoga pose tutorial");

        card.innerHTML = `
            <span class="pose-number">POSE ${poseNumber}</span>
            <h3>${pose.name}</h3>
            <p><strong>Sanskrit:</strong> ${pose.hindi}</p>
            <p>${pose.benefit}</p>
            <a
                class="pose-link"
                href="${youtubeLink}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Watch Tutorial ↗
            </a>
        `;

        poseGrid.appendChild(card);
    });
}

// Page load hone par saare 29 poses show honge
displayPoses();

// User ke type karne par list filter hogi
poseSearch.addEventListener("input", function () {
    displayPoses(this.value.trim());
});


/* 3. Breathing exercise
   4 seconds inhale + 4 seconds exhale = 1 cycle.
   Saans ko forcefully hold nahi karna hai. */

const breathingCircle = document.getElementById("breathingCircle");
const breathingText = document.getElementById("breathingText");
const breathingInstruction = document.getElementById("breathingInstruction");
const cycleCount = document.getElementById("cycleCount");
const startBreathing = document.getElementById("startBreathing");
const stopBreathing = document.getElementById("stopBreathing");

let breathingTimer = null;
let breathingPhase = "ready";
let completedCycles = 0;

// Exercise start karne par
function startExercise() {
    // Duplicate timers ko prevent karta hai
    if (breathingTimer !== null) {
        return;
    }

    breathingPhase = "inhale";
    completedCycles = 0;
    cycleCount.textContent = completedCycles;

    runBreathingPhase();

    // Har 4 seconds baad phase change hoga
    breathingTimer = setInterval(function () {
        if (breathingPhase === "inhale") {
            breathingPhase = "exhale";
        } else {
            breathingPhase = "inhale";
            completedCycles++;
            cycleCount.textContent = completedCycles;
        }

        runBreathingPhase();
    }, 4000);
}

// Circle aur instructions update karna
function runBreathingPhase() {
    breathingCircle.classList.remove("inhale", "exhale");

    // Animation ko dobara start karne mein help karta hai
    void breathingCircle.offsetWidth;

    if (breathingPhase === "inhale") {
        breathingCircle.classList.add("inhale");
        breathingText.textContent = "Breathe In";
        breathingInstruction.textContent =
            "Breathe in gently for 4 seconds.";
    } else {
        breathingCircle.classList.add("exhale");
        breathingText.textContent = "Breathe Out";
        breathingInstruction.textContent =
            "Breathe out slowly for 4 seconds.";
    }
}

// Exercise stop karke timer reset karna
function stopExercise() {
    if (breathingTimer !== null) {
        clearInterval(breathingTimer);
        breathingTimer = null;
    }

    breathingPhase = "ready";

    breathingCircle.classList.remove("inhale", "exhale");
    breathingText.textContent = "Ready?";

    breathingInstruction.textContent =
        "Press Start to begin your breathing exercise.";
}

// Buttons ko functions se connect karna
startBreathing.addEventListener("click", startExercise);
stopBreathing.addEventListener("click", stopExercise);
