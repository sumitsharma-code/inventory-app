const User = require('../models/User');

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (err) {
    console.error('List users error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) return res.status(400).json({ message: 'Cannot delete yourself' });
    const u = await User.findByIdAndDelete(req.params.id);
    if (!u) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Delete user error', err);
    res.status(500).json({ message: 'Server error' });
  }
};
