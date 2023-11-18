import Notes from "../model/notesMod.js";

//**Get----All-----Notes  */
export const getAllnotes = async (req, res) => {
  const userId = req.userId;

  try {
    const notes = await Notes.find({userId});
    res.status(200).json({ succes: true, notes: notes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//**    Post-----New----Notes  */
export const AddNewnotes = async (req, res) => {
  const userId = req.userId;

  try {
    const notes = await Notes.create({ ...req.body, userId });
    res.status(201).json({ notes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//**  Delete-----a-----Notes  */
export const DeleteNotes = async (req, res) => {
  const itemId = req.params.id;

  try {
    const deletedItem = await Notes.findByIdAndRemove(itemId);

    if (deletedItem) {
      res.status(200).json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (err) {
    res.status(500).json({
      error: "An error occurred while deleting the item.",
      details: err.message,
    });
  }
};

//**  Update------Notes  */
export const updatenotes = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updateData = req.body;

    const updatedItem = await Notes.findByIdAndUpdate(itemId, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (err) {
    console.error("Error updating item:", err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the item." });
  }
};

