const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Project = require('../models/Project');
const templates = require('../utils/templates');
const generateProjectName = require('../utils/generate-names');

const baseDirectory = path.join(path.resolve(__dirname), '..', 'projects');

class ProjectController {
  static async createProject(req, res) {
    try {
    	const { language, template } = req.body;

    	const projectName = generateProjectName()

    	const project = new Project({
      	name: projectName,
      	owner: req.user._id,
      	language,
    	});

    	await project.save();
    	const projectDirectory = path.join(baseDirectory, project._id.toString());

    	await fs.mkdir(projectDirectory, (err) => {
  						if (err) {
   							 console.error('Error creating directory:', err);
   							 throw new Error();
  						} 
						});
    	const baseFolderStructure = templates[language];
      
      const createFilesAndFolders = async (items, currentPath = '') => {
        if (Array.isArray(items)) {
          for (const item of items) {
            const itemPath = path.join(projectDirectory, currentPath, item.name);

            if (item.isFolder) {
              if (!fs.existsSync(itemPath)) {
                fs.mkdirSync(itemPath);
              }

              item.lastSaved = Date.now();
              await createFilesAndFolders(item.items, path.join(currentPath, item.name));
            } else {
              fs.writeFileSync(itemPath, item.content);
              item.lastSaved = Date.now();
            }
          }
        } else if (typeof items === 'object') {
          const itemPath = path.join(projectDirectory, currentPath, items.name);
          if(items.isFolder) {
            if (!fs.existsSync(itemPath)) {
                fs.mkdirSync(itemPath);
              }

              items.lastSaved = Date.now();
              await createFilesAndFolders(items.items, path.join(currentPath, items.name));
          } else {
              fs.writeFileSync(itemPath, items.content);
              items.lastSaved = Date.now();
          }
        }
      };

      await createFilesAndFolders(baseFolderStructure);
      project.files = baseFolderStructure;
      await project.save();
      res.status(201).json({project, user: req.user});
    } catch (error) {
      console.log('Error creating project:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  }
 
  static async getAllProjects(req, res) {
    try {
      const projects = await Project.find({ owner: req.user._id });
      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  static async getProjectById(req, res) {
    const projectId = req.params.id;
    
     if (!mongoose.isValidObjectId(projectId)) {
       return res.status(400).json({ error: 'Invalid project ID' });
     }

    try {
      const project = await Project.findOne({
        _id: projectId,
        owner: req.user._id,
      });

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.status(200).json({project, user: req.user});
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  static async updateProjectById(req, res) {
    const projectId = req.params.id;
    const updateData = req.body;
    const {file} = updateData

    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    try {
      const filePath = path.join(baseDirectory, updateData._id.toString(), "root", file.path);
      fs.writeFileSync(filePath, file.content);
      updateData.lastSaved = Date.now();
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        updateData,
        { new: true }
      );
			
      if (!updatedProject) {
        return res.status(404).json({ error: 'Project not found' });
      }

      return res.status(200).json(updatedProject);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  static async createNewFile(req, res) {
    const projectId = req.params.id;
    const updateData = req.body;
    const {file} = updateData

    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    try {
      const filePath = path.join(baseDirectory, updateData._id.toString(), "root", file.path);
      fs.writeFileSync(filePath, '');
      updateData.lastSaved = Date.now();
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        updateData,
        { new: true }
      );
			
      if (!updatedProject) {
        return res.status(404).json({ error: 'Project not found' });
      }

      return res.status(200).json(updatedProject);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  static async createNewFolder(req, res) {
    const projectId = req.params.id;
    const updateData = req.body;
    const {file} = updateData

    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    try {
      const filePath = path.join(baseDirectory, updateData._id.toString(), "root", file.path);
      fs.writeFileSync(filePath, '');
      updateData.lastSaved = Date.now();
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        updateData,
        { new: true }
      );
			
      if (!updatedProject) {
        return res.status(404).json({ error: 'Project not found' });
      }

      return res.status(200).json(updatedProject);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  static async deleteProjectById(req, res) {
    const projectId = req.params.id;
    const userId = req.user._id;

    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    try {
      const project = await Project.findById(projectId);

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      if (project.owner.toString() !== userId.toString()) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      project.deleted = true;
      project.timeDeleted = new Date();
      await project.save();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  static async getRecentProjects(req, res) {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const projects = await Project.find({ 
      	owner: req.user._id ,
      	createdAt: { $gte: thirtyDaysAgo } 
      });
      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  static async getSharedProjects(req, res) {
    try {
      const projects = await Project.find({ sharedUsers: req.user._id });
      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  static async getContributedProjects(req, res) {
    try {
      const projects = await Project.find({ contributors: req.user._id });
      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  static async getDraftProjects(req, res) {
    try {
      const projects = await Project.find({
        owner: req.user._id,
        isDraft: true,
      });
      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  static async getDeletedProjects(req, res) {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const projects = await Project.find({
      	owner: req.user._id,
        deleted: true,
        timeDeleted: { $lte: thirtyDaysAgo },
      });

      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
}

module.exports = ProjectController;

